import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Clock, ChevronLeft, ChevronRight, Flag, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getQuestions } from "@/data/companyQuestions";
import { evaluateAptitude } from "@/api/aptitudeApi";
import { Question } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import type { AptitudeResultsState } from "./AptitudeResults";

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const AptitudeTest = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const companyName = companyId ? decodeURIComponent(companyId) : "Google";

  const { user } = useAuth();
  const userId: number | null = user?.id ?? null;
  const [email, setEmail] = useState<string>(user?.email ?? "");

  const { refreshProgress, addPracticeTime } = useProgress();
  const testStartTimeRef = useRef<number | null>(null);

  const rawQuestions = getQuestions(companyName);

  const aptitudeQuestions: Question[] = useMemo(() => {
    const shuffledQuestions = shuffleArray(rawQuestions);
    return shuffledQuestions.map(q => {
      const correctAnswerText = q.options[q.correctAnswer - 1];
      const shuffledOptions = shuffleArray([...q.options]);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText) + 1;
      return { ...q, options: shuffledOptions, correctAnswer: newCorrectIndex };
    });
  }, [companyName]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(aptitudeQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  useEffect(() => {
    if (aptitudeQuestions.length > 0) {
      setAnswers(new Array(aptitudeQuestions.length).fill(null));
      setCurrentQuestion(0);
    }
  }, [aptitudeQuestions.length]);

  useEffect(() => {
    if (testStarted && !testStartTimeRef.current) {
      testStartTimeRef.current = Date.now();
    }
  }, [testStarted]);

  useEffect(() => {
    if (isSubmitted || !testStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, testStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < aptitudeQuestions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const analyzeCategoryBreakdown = () => {
    const categoryStats: { [key: string]: { total: number; correct: number; wrong: number } } = {};
    aptitudeQuestions.forEach((q, index) => {
      const cat = q.category || "General";
      if (!categoryStats[cat]) categoryStats[cat] = { total: 0, correct: 0, wrong: 0 };
      categoryStats[cat].total++;
      const correctIndex = q.correctAnswer - 1;
      if (answers[index] === correctIndex) categoryStats[cat].correct++;
      else categoryStats[cat].wrong++;
    });
    return categoryStats;
  };

  const analyzeWeakAreas = () => {
    const stats = analyzeCategoryBreakdown();
    const weakCategories: string[] = [];
    Object.entries(stats).forEach(([category, data]) => {
      if (data.wrong > 0) weakCategories.push(`${category} (${data.wrong}/${data.total} incorrect)`);
    });
    return weakCategories.length > 0 ? weakCategories : ["None — Great job! 🎉"];
  };

  const buildCategoryBreakdown = () => {
    const stats = analyzeCategoryBreakdown();
    return Object.entries(stats).map(([category, data]) => {
      const pct = Math.round((data.correct / data.total) * 100);
      const icon = pct >= 75 ? "✅" : pct >= 50 ? "⚠️" : "❌";
      return `${icon} ${category}: ${data.correct}/${data.total} (${pct}%)`;
    }).join("\n");
  };

  const buildWrongAnswersList = () => {
    const wrongAnswers: string[] = [];
    aptitudeQuestions.forEach((q, index) => {
      const correctIndex = q.correctAnswer - 1;
      const userAnswer = answers[index];
      if (userAnswer === null || userAnswer !== correctIndex) {
        const userAnswerText = userAnswer === null ? "Not answered" : q.options[userAnswer];
        const correctAnswerText = q.options[correctIndex];
        const explanation = q.explanation || "Review this topic further.";
        wrongAnswers.push(
          `Q${index + 1}: ${q.question}\n` +
          `✗ You: ${userAnswerText}\n` +
          `✓ Ans: ${correctAnswerText}\n` +
          `💡 ${explanation}`
        );
      }
    });
    return wrongAnswers.length > 0
      ? wrongAnswers.join("\n──────────────────\n")
      : "You answered all questions correctly! 🎉";
  };

  // ── Build structured wrong answers for in-app results page ──
  const buildWrongAnswersStructured = () => {
    return aptitudeQuestions
      .map((q, index) => {
        const correctIndex = q.correctAnswer - 1;
        const userAnswer = answers[index];
        if (userAnswer === null || userAnswer !== correctIndex) {
          return {
            questionIndex: index,
            questionText: q.question,
            userAnswer: userAnswer === null ? "Not answered" : q.options[userAnswer],
            correctAnswer: q.options[correctIndex],
            explanation: q.explanation || "Review this topic further.",
          };
        }
        return null;
      })
      .filter(Boolean) as AptitudeResultsState["wrongAnswers"];
  };

  const buildPersonalizedResources = () => {
    const stats = analyzeCategoryBreakdown();
    const resourceMap: { [key: string]: string[] } = {
      "Numerical": [
        "📐 IndiaBix Quantitative Aptitude: https://www.indiabix.com/aptitude/questions-and-answers/",
        "📊 Khan Academy Arithmetic: https://www.khanacademy.org/math/arithmetic",
        "🔢 Testbook Quantitative: https://testbook.com/quantitative-aptitude",
      ],
      "Logical Reasoning": [
        "🧠 IndiaBix Logical Reasoning: https://www.indiabix.com/logical-reasoning/questions-and-answers/",
        "💡 Brilliant.org Logic Puzzles: https://brilliant.org/courses/logic/",
        "📝 Testbook Logical Reasoning: https://testbook.com/logical-reasoning",
      ],
      "Verbal": [
        "📖 IndiaBix Verbal Ability: https://www.indiabix.com/verbal-ability/questions-and-answers/",
        "✍️ Grammarly Handbook: https://www.grammarly.com/blog/category/handbook/",
        "🗣️ Testbook English: https://testbook.com/english-language",
      ],
      "Technical Aptitude": [
        "💻 GeeksForGeeks CS Fundamentals: https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
        "🖥️ JavaTPoint Technical: https://www.javatpoint.com/technical-aptitude",
        "⚙️ IndiaBix Technical: https://www.indiabix.com/technical/",
      ],
    };
    const weakResources: string[] = [];
    Object.entries(stats).forEach(([category, data]) => {
      const pct = (data.correct / data.total) * 100;
      if (pct < 75) {
        const key = Object.keys(resourceMap).find(k =>
          category.toLowerCase().includes(k.toLowerCase()) ||
          k.toLowerCase().includes(category.toLowerCase())
        );
        if (key && resourceMap[key]) {
          weakResources.push(`\n📌 ${category} Resources:`);
          resourceMap[key].forEach(r => weakResources.push(`   ${r}`));
        }
      }
    });
    return weakResources.length > 0
      ? weakResources.join("\n")
      : "🎉 Great job! You performed well across all categories.\n   Keep practicing at: https://www.indiabix.com";
  };

  // ── Build structured resources for in-app results page ──
  const buildResourcesStructured = (): AptitudeResultsState["resources"] => {
    const stats = analyzeCategoryBreakdown();
    const resourceMap: { [key: string]: { label: string; url: string }[] } = {
      "Numerical": [
        { label: "IndiaBix Quantitative Aptitude", url: "https://www.indiabix.com/aptitude/questions-and-answers/" },
        { label: "Khan Academy Arithmetic", url: "https://www.khanacademy.org/math/arithmetic" },
        { label: "Testbook Quantitative", url: "https://testbook.com/quantitative-aptitude" },
      ],
      "Logical Reasoning": [
        { label: "IndiaBix Logical Reasoning", url: "https://www.indiabix.com/logical-reasoning/questions-and-answers/" },
        { label: "Brilliant.org Logic Puzzles", url: "https://brilliant.org/courses/logic/" },
        { label: "Testbook Logical Reasoning", url: "https://testbook.com/logical-reasoning" },
      ],
      "Verbal": [
        { label: "IndiaBix Verbal Ability", url: "https://www.indiabix.com/verbal-ability/questions-and-answers/" },
        { label: "Grammarly Handbook", url: "https://www.grammarly.com/blog/category/handbook/" },
        { label: "Testbook English", url: "https://testbook.com/english-language" },
      ],
      "Technical Aptitude": [
        { label: "GeeksForGeeks CS Fundamentals", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/" },
        { label: "JavaTPoint Technical", url: "https://www.javatpoint.com/technical-aptitude" },
        { label: "IndiaBix Technical", url: "https://www.indiabix.com/technical/" },
      ],
    };

    const result: AptitudeResultsState["resources"] = [];
    Object.entries(stats).forEach(([category, data]) => {
      const pct = (data.correct / data.total) * 100;
      if (pct < 75) {
        const key = Object.keys(resourceMap).find(k =>
          category.toLowerCase().includes(k.toLowerCase()) ||
          k.toLowerCase().includes(category.toLowerCase())
        );
        if (key && resourceMap[key]) {
          result.push({ category, links: resourceMap[key] });
        }
      }
    });

    if (result.length === 0) {
      result.push({
        category: "Keep Sharpening",
        links: [
          { label: "IndiaBix Practice", url: "https://www.indiabix.com" },
          { label: "Testbook Aptitude", url: "https://testbook.com/aptitude" },
        ],
      });
    }
    return result;
  };

  const buildPieChart = () => {
    const stats = analyzeCategoryBreakdown();
    const entries = Object.entries(stats);
    const total = entries.reduce((sum, [, d]) => sum + d.total, 0);
    const colors = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

    const barCells = entries.map(([, data], i) => {
      const pct = Math.round((data.total / total) * 100);
      const color = colors[i % colors.length];
      return `<td width="${pct}%" style="background:${color};height:28px;">&nbsp;</td>`;
    }).join("");

    const barLabels = entries.map(([, data], i) => {
      const pct = Math.round((data.total / total) * 100);
      const color = colors[i % colors.length];
      return `<td width="${pct}%" style="text-align:center;font-size:9px;color:${color};font-weight:700;padding-top:3px;">${pct}%</td>`;
    }).join("");

    const legendRows = entries.map(([category, data], i) => {
      const color = colors[i % colors.length];
      const scorePct = Math.round((data.correct / data.total) * 100);
      const icon = scorePct >= 75 ? "✅" : scorePct >= 50 ? "⚠️" : "❌";
      const pct = Math.round((data.total / total) * 100);
      return `
        <tr>
          <td style="padding:7px 10px;border-bottom:1px solid #f1f5f9;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="18" style="vertical-align:middle;padding-right:8px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:14px;height:14px;border-radius:3px;background:${color};font-size:1px;">&nbsp;</td>
                  </tr></table>
                </td>
                <td style="vertical-align:middle;font-size:12px;color:#374151;">
                  ${icon} ${category}
                </td>
                <td style="vertical-align:middle;text-align:center;font-size:11px;color:#6b7280;">
                  ${pct}% of test
                </td>
                <td style="vertical-align:middle;text-align:right;font-size:12px;font-weight:700;color:${color};white-space:nowrap;">
                  ${data.correct}/${data.total} (${scorePct}%)
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    }).join("");

    return `
      <table width="100%" cellpadding="0" cellspacing="0"
        style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <tr>
          <td style="padding:20px 24px;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:800;color:#374151;
              text-transform:uppercase;letter-spacing:1px;text-align:center;">
              📊 Category Score Distribution
            </p>
            <table width="100%" cellpadding="0" cellspacing="0"
              style="border-radius:6px;overflow:hidden;margin-bottom:4px;">
              <tr>${barCells}</tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>${barLabels}</tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#ffffff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
              ${legendRows}
            </table>
          </td>
        </tr>
      </table>
    `;
  };

  // ── PASS EMAIL ──────────────────────────────────────────────────────────────
  const buildPassEmailContent = (
    candidateName: string, score: number, total: number,
    pct: number, company: string, nextRound: string, resources: string
  ): string => {
    const stats = analyzeCategoryBreakdown();
    const strong = Object.entries(stats)
      .filter(([, d]) => Math.round((d.correct / d.total) * 100) >= 75)
      .map(([cat, d]) => `${cat} — ${d.correct}/${d.total} (${Math.round((d.correct/d.total)*100)}%)`)
      .join("<br/>");
    const bar = `
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background:#e5e7eb;border-radius:999px;height:16px;overflow:hidden;">
          <table width="${pct.toFixed(0)}%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#16a34a;height:16px;border-radius:999px;">&nbsp;</td></tr>
          </table>
        </td></tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
        <tr>
          <td style="font-size:11px;color:#9ca3af;">0%</td>
          <td style="text-align:center;"><span style="font-size:18px;font-weight:800;color:#16a34a;">${pct.toFixed(1)}%</span></td>
          <td style="text-align:right;font-size:11px;color:#9ca3af;">100%</td>
        </tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">
        <tr>
          <td width="75%" style="border-right:2px dashed #d1d5db;padding-right:4px;text-align:right;font-size:10px;color:#9ca3af;">Pass mark: 75%</td>
          <td style="padding-left:6px;font-size:10px;color:#9ca3af;">&#9650;</td>
        </tr>
      </table>`;
    return `
      <tr><td style="padding:32px 40px 10px;">
        <p style="margin:0;font-size:16px;color:#374151;">Hello ${candidateName},</p>
        <p style="margin:12px 0 0;font-size:15px;color:#6b7280;line-height:1.7;">
          Congratulations — you have cleared the <strong>${company}</strong> Aptitude Round
          and qualified for the <strong>${nextRound}</strong>.
        </p>
      </td></tr>
      <tr><td style="padding:20px 40px 10px;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:12px;border:1px solid #bbf7d0;">
          <tr><td style="padding:28px;text-align:center;">
            <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#15803d;font-weight:700;">Your Score</p>
            <p style="margin:8px 0;font-size:56px;font-weight:900;color:#14532d;line-height:1;">${score}/${total}</p>
            <p style="margin:0;font-size:24px;font-weight:800;color:#16a34a;">${pct.toFixed(1)}%</p>
            <div style="margin-top:14px;">
              <span style="display:inline-block;padding:8px 32px;border-radius:50px;background:#16a34a;color:#ffffff;font-size:14px;font-weight:800;letter-spacing:2px;">PASSED</span>
            </div>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:8px 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border:1px solid #e5e7eb;">
          <tr><td style="padding:16px 24px;">${bar}</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Performance Breakdown</p>
        ${buildPieChart()}
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">What You Did Well</p>
        <div style="background:linear-gradient(135deg,#f0fdf4,#f7fef9);border:1px solid #bbf7d0;border-left:4px solid #16a34a;border-radius:6px;padding:18px;">
          <p style="margin:0;font-size:13px;color:#14532d;line-height:2;">${strong || "All categories — excellent performance."}</p>
        </div>
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Next Step</p>
        <div style="background:linear-gradient(135deg,#eff6ff,#e0f2fe);border:1px solid #bfdbfe;border-left:4px solid #2563eb;border-radius:6px;padding:18px;">
          <p style="margin:0;font-size:15px;color:#1e40af;font-weight:700;">${nextRound} — You are qualified.</p>
          <p style="margin:8px 0 0;font-size:13px;color:#3b82f6;line-height:1.6;">Head to your dashboard to begin. Each round is harder — prepare well.</p>
        </div>
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px 36px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Preparation Resources</p>
        <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);border:1px solid #ddd6fe;border-left:4px solid #7c3aed;border-radius:6px;padding:18px;">
          <p style="margin:0;font-size:13px;color:#5b21b6;line-height:2.2;white-space:pre-line;">${resources}</p>
        </div>
      </td></tr>`;
  };

  // ── FAIL EMAIL ───────────────────────────────────────────────────────────────
  const buildFailEmailContent = (
    candidateName: string, score: number, total: number,
    pct: number, company: string,
    wrongAnswersList: string, weakAreas: string[], resources: string
  ): string => {
    const categoryBreakdown = buildCategoryBreakdown();
    const bar = `
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background:#e5e7eb;border-radius:999px;height:16px;overflow:hidden;">
          <table width="${pct.toFixed(0)}%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#dc2626;height:16px;border-radius:999px;">&nbsp;</td></tr>
          </table>
        </td></tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
        <tr>
          <td style="font-size:11px;color:#9ca3af;">0%</td>
          <td style="text-align:center;"><span style="font-size:18px;font-weight:800;color:#dc2626;">${pct.toFixed(1)}%</span></td>
          <td style="text-align:right;font-size:11px;color:#9ca3af;">100%</td>
        </tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">
        <tr>
          <td width="75%" style="border-right:2px dashed #d1d5db;padding-right:4px;text-align:right;font-size:10px;color:#9ca3af;">Pass mark: 75%</td>
          <td style="padding-left:6px;font-size:10px;color:#9ca3af;">&#9650;</td>
        </tr>
      </table>`;
    return `
      <tr><td style="padding:32px 40px 10px;">
        <p style="margin:0;font-size:16px;color:#374151;">Hello ${candidateName},</p>
        <p style="margin:12px 0 0;font-size:15px;color:#6b7280;line-height:1.7;">
          Thank you for attempting the <strong>${company}</strong> Aptitude Round.
          You did not clear this round — but this report will help you understand exactly what to work on.
        </p>
      </td></tr>
      <tr><td style="padding:20px 40px 10px;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="background:linear-gradient(135deg,#fef2f2,#fff5f5);border-radius:12px;border:1px solid #fecaca;">
          <tr><td style="padding:28px;text-align:center;">
            <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#991b1b;font-weight:700;">Your Score</p>
            <p style="margin:8px 0;font-size:56px;font-weight:900;color:#7f1d1d;line-height:1;">${score}/${total}</p>
            <p style="margin:0;font-size:24px;font-weight:800;color:#dc2626;">${pct.toFixed(1)}%</p>
            <div style="margin-top:14px;">
              <span style="display:inline-block;padding:8px 32px;border-radius:50px;background:#dc2626;color:#ffffff;font-size:14px;font-weight:800;letter-spacing:2px;">NOT PASSED</span>
            </div>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:8px 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;border:1px solid #e5e7eb;">
          <tr><td style="padding:16px 24px;">${bar}</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Performance Breakdown</p>
        ${buildPieChart()}
        <div style="background:linear-gradient(135deg,#fffbeb,#fefce8);border:1px solid #fde68a;border-left:4px solid #d97706;border-radius:6px;padding:16px;margin-top:14px;">
          <p style="margin:0;font-size:13px;color:#92400e;line-height:2;white-space:pre-line;">${categoryBreakdown}</p>
        </div>
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Areas to Focus On</p>
        <div style="background:linear-gradient(135deg,#fff7ed,#fff4e6);border:1px solid #fed7aa;border-left:4px solid #ea580c;border-radius:6px;padding:16px;">
          <p style="margin:0;font-size:13px;color:#7c2d12;line-height:2;white-space:pre-line;">${weakAreas.join("\n")}</p>
        </div>
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Questions to Review</p>
        <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:10px;padding:18px 20px;">
          <p style="margin:0;font-size:11.5px;color:#374151;line-height:2;white-space:pre-line;font-family:'Courier New',Courier,monospace;">${wrongAnswersList}</p>
        </div>
        <p style="margin:10px 0 0;font-size:11px;color:#9ca3af;text-align:right;">Review each explanation carefully before your next attempt.</p>
      </td></tr>
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"/></td></tr>
      <tr><td style="padding:28px 40px 36px;">
        <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Recommended Resources</p>
        <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);border:1px solid #ddd6fe;border-left:4px solid #7c3aed;border-radius:6px;padding:18px;">
          <p style="margin:0;font-size:13px;color:#5b21b6;line-height:2.2;white-space:pre-line;">${resources}</p>
        </div>
        <p style="margin:12px 0 0;font-size:13px;color:#6b7280;text-align:center;">You can retake this round after 1 hour. Use the time to review the topics above.</p>
      </td></tr>`;
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    if (!userId || aptitudeQuestions.length === 0) return;

    if (!email || !email.includes("@")) {
      toast({ title: "Email Missing", description: "Please provide a valid email address.", variant: "destructive" });
      return;
    }

    if (testStartTimeRef.current && userId) {
      const secondsSpent = Math.floor((Date.now() - testStartTimeRef.current) / 1000);
      addPracticeTime(secondsSpent, userId);
    }

    setIsSubmitted(true);

    const totalQuestions = aptitudeQuestions.length;
    const correctCount = answers.reduce((count, ans, index) => {
      const correctIndex = aptitudeQuestions[index].correctAnswer - 1;
      return ans === correctIndex ? count + 1 : count;
    }, 0);
    const percentage = totalQuestions === 0 ? 0 : (correctCount / totalQuestions) * 100;
    const isPassed = percentage >= 75;

    const weakAreas = analyzeWeakAreas();
    const categoryBreakdown = buildCategoryBreakdown();
    const categoryStats = analyzeCategoryBreakdown();
    const wrongAnswersList = buildWrongAnswersList();
    const personalizedResources = buildPersonalizedResources();
    const pieChart = buildPieChart();

    const responses = aptitudeQuestions.map((q, index) => {
      const correctIndex = q.correctAnswer - 1;
      const userAnswerIndex = answers[index] ?? -1;
      return {
        questionIndex: index,
        selectedOption: userAnswerIndex,
        correctOption: correctIndex,
        questionText: q.question,
        selectedOptionText: userAnswerIndex === -1 ? "Not answered" : q.options[userAnswerIndex],
        correctOptionText: q.options[correctIndex],
        explanation: q.explanation || "Review this topic further.",
      };
    });

    try {
      const evalResponse = await evaluateAptitude(responses, companyName, userId);

      if (evalResponse.status === 429) {
        const errorData = await evalResponse.json();
        setIsRateLimited(true);
        setRateLimitMessage(errorData.message || "Too many attempts. Please wait 1 hour before trying again.");
        setIsSubmitted(false);
        return;
      }

      if (userId) await refreshProgress(userId);

      // ── Navigate to results page immediately ──
      navigate(`/results/aptitude/${encodeURIComponent(companyName)}`, {
        state: {
          companyName,
          score: correctCount,
          totalQuestions,
          percentage,
          passed: isPassed,
          categoryStats,
          wrongAnswers: buildWrongAnswersStructured(),
          resources: buildResourcesStructured(),
        } as AptitudeResultsState,
      });

      // ── Send email in background (non-blocking) ──
      const userName = user?.fullName || "Candidate";
      import("@emailjs/browser").then(({ default: emailjs }) => {

        // Build the dynamic main_content block based on pass/fail
        const passResources =
          "LeetCode: https://leetcode.com\n" +
          "GeeksForGeeks: https://www.geeksforgeeks.org\n" +
          "IndiaBix Technical: https://www.indiabix.com/technical/\n" +
          "NeetCode Roadmap: https://neetcode.io/roadmap";

        const mainContent = isPassed
          ? buildPassEmailContent(
              userName,
              correctCount,
              totalQuestions,
              percentage,
              companyName,
              "Technical Round",
              passResources,
            )
          : buildFailEmailContent(
              userName,
              correctCount,
              totalQuestions,
              percentage,
              companyName,
              wrongAnswersList,
              weakAreas,
              personalizedResources,
            );

        emailjs.send(
          "service_qmge4ea",
          "template_tkihh98",
          {
            to_email: email,
            subject: isPassed
              ? `SkillMirror — ${companyName} Aptitude Round Cleared`
              : `SkillMirror — ${companyName} Aptitude Round: Performance Report`,
            main_content: mainContent,
          },
          "MMaLzV-Wvmsya4aWx"
        ).catch(err => console.error("EmailJS Error:", err));
      });

    } catch (backendError) {
      console.error("Backend failed:", backendError);
      toast({ title: "Submission Failed", description: "Could not evaluate test. Please try again.", variant: "destructive" });
      setIsSubmitted(false);
    }
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = aptitudeQuestions.length === 0 ? 0 : (answeredCount / aptitudeQuestions.length) * 100;

  if (isRateLimited) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-destructive">Test Locked</h1>
            <p className="text-muted-foreground">{companyName} - Aptitude Test</p>
          </div>
          <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-lg mb-6">
            <p className="text-lg font-semibold text-destructive mb-2">Too Many Attempts!</p>
            <p className="text-muted-foreground">{rateLimitMessage}</p>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="w-full">Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="mb-6 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Before You Start</h1>
            <p className="text-muted-foreground">{companyName} - Aptitude Test</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email" type="email" placeholder="your.email@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-2">
                We'll send your test results and personalized feedback to this email.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h3 className="font-semibold">Test Details:</h3>
              <ul className="text-sm space-y-1">
                <li>• 30 questions</li>
                <li>• 40 minutes duration</li>
                <li>• 75% passing score</li>
                <li>• Detailed feedback via email</li>
              </ul>
            </div>
            <Button
              onClick={() => {
                if (!email || !email.includes('@')) {
                  toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
                  return;
                }
                setTestStarted(true);
              }}
              className="w-full" size="lg"
            >
              Start Test
            </Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent">
                  SkillMirror
                </span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <div className="text-sm text-muted-foreground">Aptitude Test</div>
                <div className="font-semibold">{companyName}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                timeLeft < 300 ? 'bg-destructive/10 text-destructive' : 'bg-muted'
              }`}>
                <Clock className="h-4 w-4" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <Button onClick={handleSubmit} size="sm" disabled={isSubmitted}>
                <Flag className="h-4 w-4 mr-2" />
                {isSubmitted ? "Submitting..." : "Submit Test"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress: {answeredCount}/{aptitudeQuestions.length} answered</span>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 mb-6">
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Question {currentQuestion + 1} of {aptitudeQuestions.length}
            </div>
            <h2 className="text-2xl font-semibold">{aptitudeQuestions[currentQuestion].question}</h2>
          </div>
          <div className="space-y-3">
            {aptitudeQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  answers[currentQuestion] === index ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === index ? 'border-primary bg-primary' : 'border-border'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" />Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} / {aptitudeQuestions.length}
          </div>
          <Button onClick={handleNext} disabled={currentQuestion === aptitudeQuestions.length - 1}>
            Next<ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <Card className="mt-8 p-6">
          <h3 className="font-semibold mb-4">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {aptitudeQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`h-10 w-10 rounded-lg border-2 font-semibold transition-all ${
                  currentQuestion === index
                    ? 'border-primary bg-primary text-primary-foreground'
                    : answers[index] !== null
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AptitudeTest;