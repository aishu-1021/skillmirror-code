import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Clock, ChevronLeft, ChevronRight, Flag, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getQuestions } from "@/data/companyQuestions";
import { evaluateAptitude } from "@/api/aptitudeApi";
import { Question } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";

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
      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectIndex,
      };
    });
  }, [companyName]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(aptitudeQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const CUTOFF_PERCENTAGE = 75;
  const [resultMessage, setResultMessage] = useState<string | null>(null);
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
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
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
    if (currentQuestion < aptitudeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const analyzeCategoryBreakdown = () => {
    const categoryStats: {
      [key: string]: { total: number; correct: number; wrong: number };
    } = {};

    aptitudeQuestions.forEach((q, index) => {
      const cat = q.category || "General";
      if (!categoryStats[cat]) {
        categoryStats[cat] = { total: 0, correct: 0, wrong: 0 };
      }
      categoryStats[cat].total++;
      const correctIndex = q.correctAnswer - 1;
      if (answers[index] === correctIndex) {
        categoryStats[cat].correct++;
      } else {
        categoryStats[cat].wrong++;
      }
    });

    return categoryStats;
  };

  const analyzeWeakAreas = () => {
    const stats = analyzeCategoryBreakdown();
    const weakCategories: string[] = [];

    Object.entries(stats).forEach(([category, data]) => {
      if (data.wrong > 0) {
        weakCategories.push(
          `${category} (${data.wrong}/${data.total} incorrect)`
        );
      }
    });

    return weakCategories.length > 0 ? weakCategories : ["None — Great job! 🎉"];
  };

  const buildCategoryBreakdown = () => {
    const stats = analyzeCategoryBreakdown();

    return Object.entries(stats)
      .map(([category, data]) => {
        const pct = Math.round((data.correct / data.total) * 100);
        const icon = pct >= 75 ? "✅" : pct >= 50 ? "⚠️" : "❌";
        return `${icon} ${category}: ${data.correct}/${data.total} (${pct}%)`;
      })
      .join("\n");
  };

  const buildWrongAnswersList = () => {
    const wrongAnswers: string[] = [];

    aptitudeQuestions.forEach((q, index) => {
      const correctIndex = q.correctAnswer - 1;
      const userAnswer = answers[index];

      if (userAnswer === null || userAnswer !== correctIndex) {
        const userAnswerText =
          userAnswer === null ? "Not answered" : q.options[userAnswer];
        const correctAnswerText = q.options[correctIndex];
        const explanation = q.explanation || "Review this topic further.";

        wrongAnswers.push(
          `❓ Q${index + 1}: ${q.question}\n` +
          `   ✗ Your answer: ${userAnswerText}\n` +
          `   ✓ Correct answer: ${correctAnswerText}\n` +
          `   💡 Why: ${explanation}`
        );
      }
    });

    return wrongAnswers.length > 0
      ? wrongAnswers.join("\n\n")
      : "You answered all questions correctly! 🎉";
  };

  // ── Personalized resources based on weak categories ─────────────────
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

  const handleSubmit = async () => {
    if (isSubmitted) return;
    if (!userId || aptitudeQuestions.length === 0) return;

    if (!email || !email.includes("@")) {
      toast({
        title: "Email Missing",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (testStartTimeRef.current && userId) {
      const secondsSpent = Math.floor(
        (Date.now() - testStartTimeRef.current) / 1000
      );
      addPracticeTime(secondsSpent, userId);
    }

    setIsSubmitted(true);
    setIsSendingEmail(true);

    const totalQuestions = aptitudeQuestions.length;
    const correctCount = answers.reduce((count, ans, index) => {
      const correctIndex = aptitudeQuestions[index].correctAnswer - 1;
      return ans === correctIndex ? count + 1 : count;
    }, 0);
    const percentage =
      totalQuestions === 0 ? 0 : (correctCount / totalQuestions) * 100;

    const isPassed = percentage >= CUTOFF_PERCENTAGE;
    const weakAreas = analyzeWeakAreas();
    const categoryBreakdown = buildCategoryBreakdown();
    const wrongAnswersList = buildWrongAnswersList();
    const personalizedResources = buildPersonalizedResources(); // ✅ NEW

    const responses = aptitudeQuestions.map((q, index) => {
      const correctIndex = q.correctAnswer - 1;
      const userAnswerIndex = answers[index] ?? -1;

      return {
        questionIndex: index,
        selectedOption: userAnswerIndex,
        correctOption: correctIndex,
        questionText: q.question,
        selectedOptionText:
          userAnswerIndex === -1 ? "Not answered" : q.options[userAnswerIndex],
        correctOptionText: q.options[correctIndex],
        explanation: q.explanation || "Review this topic further.",
      };
    });

    try {
      const evalResponse = await evaluateAptitude(responses, companyName, userId);

      if (evalResponse.status === 429) {
        const errorData = await evalResponse.json();
        setIsRateLimited(true);
        setRateLimitMessage(
          errorData.message ||
          "Too many attempts. Please wait 1 hour before trying again."
        );
        setIsSubmitted(false);
        setIsSendingEmail(false);
        return;
      }

      if (userId) await refreshProgress(userId);

      setResultMessage(
        isPassed
          ? "Congratulations! You have cleared the Aptitude Round and qualified for the Technical Round 🎉"
          : "You did not clear the Aptitude Round. Focus on your weak areas and try again 💪"
      );

      const userName = user?.fullName || "Candidate";

      try {
        const emailPayload: Record<string, string> = {
          to_email: email,
          from_name: "SkillMirror",
          candidate_name: userName,
          subject: isPassed
            ? "SkillMirror Aptitude Test – Qualified for Technical Round"
            : "SkillMirror Aptitude Test – Performance Analysis",
          message: isPassed
            ? `Congratulations! You have cleared the Aptitude Round for ${companyName}.`
            : `Thank you for taking the Aptitude Test for ${companyName}. Here is your detailed performance analysis.`,
          score: `${correctCount}/${totalQuestions}`,
          percentage: percentage.toFixed(2),
          status: isPassed ? "PASSED" : "FAILED",
          status_color: isPassed ? "#16a34a" : "#dc2626",
          status_icon: isPassed ? "✅" : "❌",
          weak_areas: isPassed
            ? `All categories passed! 🎉\n\n${categoryBreakdown}`
            : `${weakAreas.join("\n")}\n\n📊 Full Breakdown:\n${categoryBreakdown}`,
          next_round: isPassed
            ? "✅ Technical Round — You are qualified!"
            : "❌ Not Qualified — Keep practicing!",
          // ✅ CHANGED: personalized resources instead of generic links
          resources: isPassed
            ? "🎉 You are eligible for the Technical Round!\n\n🔥 Start preparing:\n   💻 LeetCode: https://leetcode.com\n   📘 GeeksForGeeks: https://www.geeksforgeeks.org\n   🧠 IndiaBix Technical: https://www.indiabix.com/technical/"
            : personalizedResources,
          wrong_answers: isPassed
            ? "You passed! No wrong answers to review."
            : wrongAnswersList,
        };

        const { default: emailjs } = await import("@emailjs/browser");
        await emailjs.send(
          "service_qmge4ea",
          "template_tkihh98",
          emailPayload,
          "MMaLzV-Wvmsya4aWx"
        );

        toast({
          title: "Email Sent Successfully",
          description: `Results sent to ${email}`,
        });
      } catch (error) {
        console.error("EmailJS Error:", error);
        toast({
          title: "Email Failed",
          description: "Email service error. Check EmailJS configuration.",
          variant: "destructive",
        });
      }

    } catch (backendError) {
      console.error("Backend failed:", backendError);
      toast({
        title: "Submission Failed",
        description: "Could not evaluate test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress =
    aptitudeQuestions.length === 0
      ? 0
      : (answeredCount / aptitudeQuestions.length) * 100;

  if (isRateLimited) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-destructive">
              Test Locked
            </h1>
            <p className="text-muted-foreground">{companyName} - Aptitude Test</p>
          </div>
          <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-lg mb-6">
            <p className="text-lg font-semibold text-destructive mb-2">
              Too Many Attempts!
            </p>
            <p className="text-muted-foreground">{rateLimitMessage}</p>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Back to Dashboard
          </Button>
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
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
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
                  toast({
                    title: "Invalid Email",
                    description: "Please enter a valid email address.",
                    variant: "destructive",
                  });
                  return;
                }
                setTestStarted(true);
              }}
              className="w-full"
              size="lg"
            >
              Start Test
            </Button>

            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {isSendingEmail ? (
                <Mail className="h-10 w-10 text-primary animate-pulse" />
              ) : (
                <CheckCircle className="h-10 w-10 text-primary" />
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isSendingEmail ? "Sending Results..." : "Test Completed!"}
            </h1>
            <p className="text-muted-foreground">{companyName} - Aptitude Test</p>
          </div>

          <div className="space-y-4 mb-8">
            {isSendingEmail ? (
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-lg mb-2">Please wait while we process your results</p>
                <p className="text-muted-foreground">
                  We're sending a detailed analysis to <strong>{email}</strong>
                </p>
              </div>
            ) : (
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Results Sent!</h3>
                </div>
                <p className="text-lg">
                  Your test results and detailed performance analysis have been sent to:
                </p>
                <p className="text-xl font-bold text-primary">{email}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">The email includes:</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>✓ Your complete test score and percentage</li>
                    <li>✓ Score breakdown by category (Logical, Numerical, Verbal, Technical)</li>
                    <li>✓ Weak areas with detailed category analysis</li>
                    <li>✓ Every wrong question with your answer vs correct answer</li>
                    <li>✓ Explanation for each wrong answer</li>
                    <li>✓ Personalized learning resources and recommendations</li>
                    <li>✓ Next steps based on your performance</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {!isSendingEmail && resultMessage && (
            <div className="mb-6 text-lg font-semibold text-center">
              {resultMessage}
            </div>
          )}

          {!isSendingEmail && (
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/dashboard")} variant="outline">
                Back to Dashboard
              </Button>
              <Button onClick={() => window.location.reload()}>
                Retake Test
              </Button>
            </div>
          )}
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
              <Button onClick={handleSubmit} size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Progress: {answeredCount}/{aptitudeQuestions.length} answered
            </span>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 mb-6">
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Question {currentQuestion + 1} of {aptitudeQuestions.length}
            </div>
            <h2 className="text-2xl font-semibold">
              {aptitudeQuestions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3">
            {aptitudeQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary'
                      : 'border-border'
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
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} / {aptitudeQuestions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentQuestion === aptitudeQuestions.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
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