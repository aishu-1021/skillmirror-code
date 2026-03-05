import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Target,
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
} from "lucide-react";
import { technicalQuestionSets } from "@/data/technicalQuestions";

emailjs.init("MMaLzV-Wvmsya4aWx");

const TECHNICAL_TIME = 20 * 60;

const TechnicalTest = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const userId: number | null = storedUser?.id ?? null;
  const [email] = useState<string>(storedUser?.email ?? "");

  const decodedCompany = companyName
    ? decodeURIComponent(companyName)
    : "Google";

  const questions = technicalQuestionSets[decodedCompany] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(TECHNICAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // ✅ Rate limiting states
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  /* Reset */
  useEffect(() => {
    if (questions.length === 0) return;
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setTimeLeft(TECHNICAL_TIME);
    setSubmitted(false);
    setScore(0);
  }, [decodedCompany]);

  /* Timer */
  useEffect(() => {
    if (submitted || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  /* Auto submit */
  useEffect(() => {
    if (timeLeft === 0 && !submitted && !submitting) {
      handleSubmit();
    }
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
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    }
  };

  const analyzeWeakAreas = () =>
    questions
      .map((q, idx) =>
        answers[idx] !== q.correctAnswer - 1 ? q.question : null
      )
      .filter(Boolean);

  const handleSubmit = async () => {
    if (!userId || submitted || submitting) return;
    if (!email || !email.includes("@")) return;

    setSubmitting(true);
    setIsSendingEmail(true);

    try {
      const res = await fetch(
        "http://localhost:8080/api/technical/evaluate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            userId,
            companyName: decodedCompany,
            answers: answers.map((ans, idx) =>
              ans === questions[idx].correctAnswer - 1 ? 1 : 0
            ),
          }),
        }
      );

      // ✅ Handle rate limiting
      if (res.status === 429) {
        const errorData = await res.json();
        setIsRateLimited(true);
        setRateLimitMessage(
          errorData.message ||
          "Too many attempts. Please wait 1 hour before trying again."
        );
        setSubmitting(false);
        setIsSendingEmail(false);
        return;
      }

      if (!res.ok) throw new Error("Backend evaluation failed");

      const result = await res.json();

      setScore(Number(result.percentage.toFixed(2)));
      setSubmitted(true);

      if (result.interviewUnlocked) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = {
          ...currentUser,
          technicalPassed: true,
          interviewUnlocked: true,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/dashboard");
      }

      await emailjs.send(
        "service_qmge4ea",
        "template_tkihh98",
        {
          to_email: email,
          from_name: "SkillMirror",
          subject: result.passed
            ? "SkillMirror Technical Round – Qualified for Interview Round"
            : "SkillMirror Technical Round – Performance Analysis",
          message: result.passed
            ? `Congratulations! You cleared the Technical Round for ${decodedCompany}.`
            : `Thank you for attempting the Technical Round for ${decodedCompany}.`,
          score: `${result.correct}/${result.total}`,
          percentage: result.percentage.toFixed(2),
          status: result.passed ? "PASSED" : "FAILED",
          weak_areas: result.passed ? "None" : analyzeWeakAreas().join(", "),
          next_round: result.passed ? "Interview Round" : "Not Qualified",
          resources: "https://leetcode.com | https://neetcode.io",
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingEmail(false);
      setSubmitting(false);
    }
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress =
    questions.length === 0
      ? 0
      : (answeredCount / questions.length) * 100;

  // ✅ Show locked screen if rate limited
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
            <p className="text-muted-foreground">
              {decodedCompany} - Technical Test
            </p>
          </div>

          <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-lg mb-6">
            <p className="text-lg font-semibold text-destructive mb-2">
              Too Many Attempts!
            </p>
            <p className="text-muted-foreground">
              {rateLimitMessage}
            </p>
          </div>

          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  /* ===================== SUBMITTED SCREEN ===================== */
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-xl w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Technical Round Completed
            </h1>
            <p className="text-muted-foreground">
              {decodedCompany} – Technical Test
            </p>
          </div>

          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg mb-6">
            <p className="text-lg font-semibold">Your Score: {score}%</p>
            <p className="text-sm text-muted-foreground mt-2">
              ({Math.round((score / 100) * questions.length)} /{" "}
              {questions.length} correct)
            </p>
            {isSendingEmail && (
              <p className="text-sm text-muted-foreground mt-2 animate-pulse">
                Sending results to {email}...
              </p>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
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
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  /* ===================== MAIN TEST UI ===================== */
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
                <div className="text-sm text-muted-foreground">
                  Technical Test
                </div>
                <div className="font-semibold">{decodedCompany}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  timeLeft < 300
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span className="font-mono font-semibold">
                  {formatTime(timeLeft)}
                </span>
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
            <span className="text-sm font-medium">
              Progress: {answeredCount}/{questions.length} answered
            </span>
            <span className="text-sm text-muted-foreground">
              {progress.toFixed(0)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 mb-6">
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h2 className="text-2xl font-semibold">
              {questions[currentQuestion]?.question}
            </h2>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion]?.options.map(
              (option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    answers[currentQuestion] === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                    >
                      {answers[currentQuestion] === index && (
                        <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              )
            )}
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
            Question {currentQuestion + 1} / {questions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
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