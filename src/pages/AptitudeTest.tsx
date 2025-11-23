import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Clock, ChevronLeft, ChevronRight, Flag, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getQuestions } from "@/data/companyQuestions";

const AptitudeTest = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const companyName = companyId ? decodeURIComponent(companyId) : "Google";
  const aptitudeQuestions = getQuestions(companyName);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(aptitudeQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [testStarted, setTestStarted] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;
    
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
  }, [isSubmitted]);

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

  const analyzeWeakAreas = () => {
    const questionCategories: { [key: string]: number[] } = {
      "Speed and Distance": [0, 6],
      "Percentage and Profit": [1, 3, 15, 23],
      "Basic Algebra": [2, 8, 26],
      "Number Series": [4, 12, 24],
      "Ratio and Proportion": [5, 18],
      "Average": [7],
      "Simple and Compound Interest": [13, 17],
      "Geometry": [14, 25, 29],
      "Time and Work": [19, 21],
      "Probability": [22, 28],
      "Cisterns and Pipes": [16],
      "Squares and Powers": [27],
      "Sum of Natural Numbers": [20],
    };

    const weakCategories: string[] = [];
    
    Object.entries(questionCategories).forEach(([category, questionIndices]) => {
      let wrongCount = 0;
      questionIndices.forEach(index => {
        if (answers[index] !== aptitudeQuestions[index].correctAnswer) {
          wrongCount++;
        }
      });
      
      if (wrongCount > 0) {
        weakCategories.push(`${category} (${wrongCount}/${questionIndices.length} incorrect)`);
      }
    });

    return weakCategories.length > 0 ? weakCategories : ["General aptitude concepts"];
  };

  const handleSubmit = async () => {
    const answeredCount = answers.filter(a => a !== null).length;
    let correctCount = 0;
    
    answers.forEach((answer, index) => {
      if (answer === aptitudeQuestions[index].correctAnswer) {
        correctCount++;
      }
    });

    const percentage = (correctCount / aptitudeQuestions.length) * 100;

    setIsSubmitted(true);
    setIsSendingEmail(true);

    try {
      const weakAreas = analyzeWeakAreas();
      
      const { data, error } = await supabase.functions.invoke('send-test-result', {
        body: {
          email,
          companyName,
          score: correctCount,
          totalQuestions: aptitudeQuestions.length,
          percentage,
          weakAreas
        }
      });

      if (error) throw error;

      toast({
        title: "Results Sent!",
        description: `Your detailed test analysis has been sent to ${email}`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Email Failed",
        description: "There was an issue sending your results. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const answeredCount = answers.filter(a => a !== null).length;
  const progress = (answeredCount / aptitudeQuestions.length) * 100;

  // Email collection screen before test starts
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="mb-6 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Before You Start</h1>
            <p className="text-muted-foreground">
              {companyName} - Aptitude Test
            </p>
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
                  <p className="text-sm text-muted-foreground">
                    The email includes:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>✓ Your complete test score and percentage</li>
                    <li>✓ Detailed analysis of your weak areas</li>
                    <li>✓ Personalized learning resources and recommendations</li>
                    <li>✓ Next steps based on your performance</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

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
      {/* Header */}
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
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress: {answeredCount}/{aptitudeQuestions.length} answered</span>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
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

        {/* Navigation */}
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

        {/* Question Navigator */}
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
