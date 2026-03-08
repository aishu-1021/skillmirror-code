import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Target, Clock, ChevronLeft, ChevronRight, Flag, CheckCircle,
} from "lucide-react";
import { technicalQuestionSets } from "@/data/technicalQuestions";
import { evaluateTechnical } from "@/api/technicalApi";
import { Question } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";

const TECHNICAL_TIME = 20 * 60;

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TechnicalTest = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const { user, updateUser } = useAuth();
  const userId: number | null = user?.id ?? null;
  const [email] = useState<string>(user?.email ?? "");

  const { refreshProgress, addPracticeTime } = useProgress();
  const testStartTimeRef = useRef<number>(Date.now());

  const decodedCompany = companyName ? decodeURIComponent(companyName) : "Google";
  const rawQuestions = technicalQuestionSets[decodedCompany] || [];

  const questions: Question[] = useMemo(() => {
    const shuffledQuestions = shuffleArray(rawQuestions);
    return shuffledQuestions.map(q => {
      const correctAnswerText = q.options[q.correctAnswer - 1];
      const shuffledOptions = shuffleArray([...q.options]);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText) + 1;
      return { ...q, options: shuffledOptions, correctAnswer: newCorrectIndex };
    });
  }, [decodedCompany]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(TECHNICAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  useEffect(() => {
    if (questions.length === 0) return;
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setTimeLeft(TECHNICAL_TIME);
    setSubmitted(false);
    setScore(0);
    testStartTimeRef.current = Date.now();
  }, [decodedCompany]);

  useEffect(() => {
    if (submitted || timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted && !submitting) handleSubmit();
  }, [timeLeft, submitted, submitting]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const updated = [...answers];
    updated[currentQuestion] = optionIndex;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion((q) => q + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((q) => q - 1);
  };

  const analyzeCategoryBreakdown = () => {
    const categoryStats: { [key: string]: { total: number; correct: number; wrong: number } } = {};
    questions.forEach((q, index) => {
      const cat = q.category || "General";
      if (!categoryStats[cat]) categoryStats[cat] = { total: 0, correct: 0, wrong: 0 };
      categoryStats[cat].total++;
      if (answers[index] === q.correctAnswer - 1) categoryStats[cat].correct++;
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

  // ✅ UPDATED: compact format with separator lines
  const buildWrongAnswersList = () => {
    const wrongAnswers: string[] = [];
    questions.forEach((q, index) => {
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

  const buildPersonalizedResources = () => {
    const stats = analyzeCategoryBreakdown();
    const resourceMap: { [key: string]: string[] } = {
      "Algorithms": [
        "⚡ NeetCode Roadmap: https://neetcode.io/roadmap",
        "🧩 LeetCode Algorithms: https://leetcode.com/explore/learn/",
        "📘 GeeksForGeeks Algorithms: https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
      ],
      "Data Structures": [
        "🗂️ NeetCode Data Structures: https://neetcode.io/roadmap",
        "📚 GeeksForGeeks DSA: https://www.geeksforgeeks.org/data-structures/",
        "🔗 Visualgo (Visual DSA): https://visualgo.net/en",
      ],
      "System Design": [
        "🏗️ System Design Primer: https://github.com/donnemartin/system-design-primer",
        "📖 Grokking System Design: https://www.designgurus.io/course/grokking-the-system-design-interview",
        "🎥 Gaurav Sen YouTube: https://www.youtube.com/@gkcs",
      ],
      "Operating Systems": [
        "🖥️ OS Concepts - GeeksForGeeks: https://www.geeksforgeeks.org/operating-systems/",
        "📗 OSTEP (Free OS Book): https://pages.cs.wisc.edu/~remzi/OSTEP/",
        "🎓 Gate Smashers OS: https://www.youtube.com/@GateSmashers",
      ],
      "Databases": [
        "🗄️ SQLZoo Practice: https://sqlzoo.net/",
        "📊 GeeksForGeeks DBMS: https://www.geeksforgeeks.org/dbms/",
        "🎓 CMU Database Course: https://15445.courses.cs.cmu.edu/",
      ],
      "OOP": [
        "🧱 GeeksForGeeks OOP: https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
        "☕ Java OOP - JavaTPoint: https://www.javatpoint.com/java-oops-concepts",
        "📘 Refactoring Guru (Design Patterns): https://refactoring.guru/design-patterns",
      ],
      "General CS": [
        "💡 CS50 (Free Harvard Course): https://cs50.harvard.edu/",
        "📖 GeeksForGeeks CS Subjects: https://www.geeksforgeeks.org/computer-science-subjects/",
        "🎯 InterviewBit CS Fundamentals: https://www.interviewbit.com/courses/programming/",
      ],
    };
    const weakResources: string[] = [];
    Object.entries(stats).forEach(([category, data]) => {
      const pct = (data.correct / data.total) * 100;
      if (pct < 75) {
        const key = Object.keys(resourceMap).find(k => category.toLowerCase() === k.toLowerCase());
        if (key && resourceMap[key]) {
          weakResources.push(`\n📌 ${category} Resources:`);
          resourceMap[key].forEach(r => weakResources.push(`   ${r}`));
        }
      }
    });
    return weakResources.length > 0
      ? weakResources.join("\n")
      : "🎉 Excellent! You performed well across all topics.\n   Keep sharpening at: https://neetcode.io/roadmap";
  };

  // ✅ UPDATED: Gmail-safe segmented bar instead of conic-gradient
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

  const handleSubmit = async () => {
    if (!userId || submitted || submitting) return;
    if (!email || !email.includes("@")) return;

    const secondsSpent = Math.floor((Date.now() - testStartTimeRef.current) / 1000);
    addPracticeTime(secondsSpent, userId);

    setSubmitting(true);
    setIsSendingEmail(true);

    const responses = questions.map((q, index) => {
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
      const res = await evaluateTechnical(userId, decodedCompany, responses);

      if (res.status === 429) {
        const errorData = await res.json();
        setIsRateLimited(true);
        setRateLimitMessage(errorData.message || "Too many attempts. Please wait 1 hour before trying again.");
        setSubmitting(false);
        setIsSendingEmail(false);
        return;
      }

      if (!res.ok) throw new Error("Backend evaluation failed");

      const result = await res.json();

      setScore(Number(result.percentage.toFixed(2)));
      setSubmitted(true);

      if (user) {
        updateUser({
          ...user,
          technicalPassed: result.passed || false,
          interviewUnlocked: result.interviewUnlocked || false,
        });
      }
      await refreshProgress(userId);

      if (result.interviewUnlocked) navigate("/dashboard");

      const weakAreas = analyzeWeakAreas();
      const categoryBreakdown = buildCategoryBreakdown();
      const wrongAnswersList = buildWrongAnswersList();
      const personalizedResources = buildPersonalizedResources();
      const pieChart = buildPieChart();
      const userName = user?.fullName || "Candidate";
      const isPassed = result.passed;

      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        "service_qmge4ea",
        "template_tkihh98",
        {
          to_email: email,
          from_name: "SkillMirror",
          candidate_name: userName,
          subject: isPassed
            ? "SkillMirror Technical Round – Qualified for Interview Round"
            : "SkillMirror Technical Round – Performance Analysis",
          message: isPassed
            ? `Congratulations! You cleared the Technical Round for ${decodedCompany}.`
            : `Thank you for attempting the Technical Round for ${decodedCompany}. Here is your detailed performance analysis.`,
          score: `${result.correct}/${result.total}`,
          percentage: result.percentage.toFixed(2),
          status: isPassed ? "PASSED" : "FAILED",
          status_color: isPassed ? "#16a34a" : "#dc2626",
          status_icon: isPassed ? "✅" : "❌",
          weak_areas: isPassed
            ? `All categories passed! 🎉\n\n${categoryBreakdown}`
            : `${weakAreas.join("\n")}\n\n📊 Full Breakdown:\n${categoryBreakdown}`,
          next_round: isPassed ? "✅ Interview Round — You are qualified!" : "❌ Not Qualified — Keep practicing!",
          resources: isPassed
            ? "🎉 You are eligible for the Interview Round!\n\n🔥 Keep your skills sharp:\n   💼 LeetCode: https://leetcode.com\n   🗺️ NeetCode Roadmap: https://neetcode.io/roadmap\n   🏗️ System Design Primer: https://github.com/donnemartin/system-design-primer"
            : personalizedResources,
          wrong_answers: isPassed ? "You passed! No wrong answers to review." : wrongAnswersList,
          pie_chart: pieChart,
        },
        "MMaLzV-Wvmsya4aWx"
      );

    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingEmail(false);
      setSubmitting(false);
    }
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = questions.length === 0 ? 0 : (answeredCount / questions.length) * 100;

  if (isRateLimited) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-destructive">Test Locked</h1>
            <p className="text-muted-foreground">{decodedCompany} - Technical Test</p>
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-xl w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Technical Round Completed</h1>
            <p className="text-muted-foreground">{decodedCompany} – Technical Test</p>
          </div>
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg mb-6">
            <p className="text-lg font-semibold">Your Score: {score}%</p>
            <p className="text-sm text-muted-foreground mt-2">
              ({Math.round((score / 100) * questions.length)} / {questions.length} correct)
            </p>
            {isSendingEmail && (
              <p className="text-sm text-muted-foreground mt-2 animate-pulse">
                Sending results to {email}...
              </p>
            )}
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            <Button onClick={() => navigate(0)}>Retake Test</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <p>No technical questions found for {decodedCompany}</p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">Back to Dashboard</Button>
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
                <div className="text-sm text-muted-foreground">Technical Test</div>
                <div className="font-semibold">{decodedCompany}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                timeLeft < 300 ? "bg-destructive/10 text-destructive" : "bg-muted"
              }`}>
                <Clock className="h-4 w-4" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <Button onClick={handleSubmit} size="sm" disabled={submitting}>
                <Flag className="h-4 w-4 mr-2" />
                {submitting ? "Submitting..." : "Submit Test"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress: {answeredCount}/{questions.length} answered</span>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 mb-6">
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h2 className="text-2xl font-semibold">{questions[currentQuestion]?.question}</h2>
          </div>
          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  answers[currentQuestion] === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === index ? "border-primary bg-primary" : "border-border"
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
            Question {currentQuestion + 1} / {questions.length}
          </div>
          <Button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
            Next<ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <Card className="mt-8 p-6">
          <h3 className="font-semibold mb-4">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`h-10 w-10 rounded-lg border-2 font-semibold transition-all ${
                  currentQuestion === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : answers[index] !== null
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
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
export default TechnicalTest;