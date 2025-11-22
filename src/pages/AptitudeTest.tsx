import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Clock, ChevronLeft, ChevronRight, Flag, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const aptitudeQuestions = [
  {
    id: 1,
    question: "If a train travels 120 km in 2 hours, what is its average speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "If x + 5 = 12, what is x?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "A shopkeeper offers a 20% discount on an item marked at $100. What is the selling price?",
    options: ["$70", "$75", "$80", "$85"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["38", "40", "42", "44"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
    options: ["8", "9", "10", "12"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "A car covers 180 km in 3 hours. How much distance will it cover in 5 hours at the same speed?",
    options: ["280 km", "300 km", "320 km", "340 km"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "What is the average of 10, 20, 30, 40, and 50?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "If 2x - 3 = 7, what is the value of x?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "A number is increased by 25% and then decreased by 20%. What is the net change?",
    options: ["0%", "5% increase", "5% decrease", "No change"],
    correctAnswer: 0
  },
  {
    id: 11,
    question: "What is 3/4 of 80?",
    options: ["50", "55", "60", "65"],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "If a product costs $50 after a 10% discount, what was the original price?",
    options: ["$52.50", "$55", "$55.56", "$60"],
    correctAnswer: 2
  },
  {
    id: 13,
    question: "What is the next number: 1, 4, 9, 16, 25, ?",
    options: ["30", "32", "35", "36"],
    correctAnswer: 3
  },
  {
    id: 14,
    question: "A person invests $1000 at 5% simple interest per annum. What is the interest after 2 years?",
    options: ["$50", "$75", "$100", "$150"],
    correctAnswer: 2
  },
  {
    id: 15,
    question: "If the perimeter of a square is 40 cm, what is its area?",
    options: ["80 cm²", "100 cm²", "120 cm²", "160 cm²"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "What is 20% of 25% of 400?",
    options: ["15", "20", "25", "30"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "A cistern can be filled in 6 hours but due to a leak, it takes 8 hours. How long will the leak take to empty the full cistern?",
    options: ["20 hours", "22 hours", "24 hours", "26 hours"],
    correctAnswer: 2
  },
  {
    id: 18,
    question: "What is the compound interest on $1000 for 2 years at 10% per annum?",
    options: ["$200", "$210", "$220", "$230"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "If a:b = 2:3 and b:c = 4:5, what is a:c?",
    options: ["8:15", "2:5", "6:10", "4:9"],
    correctAnswer: 0
  },
  {
    id: 20,
    question: "A man can complete a work in 10 days. Another man can do the same work in 15 days. How long will they take together?",
    options: ["5 days", "6 days", "7 days", "8 days"],
    correctAnswer: 1
  },
  {
    id: 21,
    question: "What is the sum of first 10 natural numbers?",
    options: ["45", "50", "55", "60"],
    correctAnswer: 2
  },
  {
    id: 22,
    question: "If 5 workers can complete a task in 12 days, how many days will 10 workers take?",
    options: ["4 days", "5 days", "6 days", "8 days"],
    correctAnswer: 2
  },
  {
    id: 23,
    question: "What is the probability of getting a head when tossing a fair coin?",
    options: ["0.25", "0.33", "0.5", "0.75"],
    correctAnswer: 2
  },
  {
    id: 24,
    question: "If the cost price is $80 and selling price is $100, what is the profit percentage?",
    options: ["20%", "25%", "30%", "35%"],
    correctAnswer: 1
  },
  {
    id: 25,
    question: "What is the next term in: 5, 10, 20, 40, ?",
    options: ["60", "70", "80", "90"],
    correctAnswer: 2
  },
  {
    id: 26,
    question: "A rectangle has length 12 cm and width 8 cm. What is its perimeter?",
    options: ["36 cm", "40 cm", "44 cm", "48 cm"],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "If 3x + 5 = 20, what is x?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2
  },
  {
    id: 28,
    question: "What is 12² - 10²?",
    options: ["22", "40", "44", "48"],
    correctAnswer: 2
  },
  {
    id: 29,
    question: "A bag contains 5 red and 3 blue balls. What is the probability of drawing a red ball?",
    options: ["3/8", "5/8", "1/2", "2/3"],
    correctAnswer: 1
  },
  {
    id: 30,
    question: "If the area of a circle is 154 cm², what is its radius? (Use π ≈ 22/7)",
    options: ["5 cm", "6 cm", "7 cm", "8 cm"],
    correctAnswer: 2
  }
];

const AptitudeTest = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(30).fill(null));
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [testStarted, setTestStarted] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const companyName = companyId ? decodeURIComponent(companyId) : "Company";

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

    toast({
      title: "Test Submitted!",
      description: `You scored ${correctCount}/${aptitudeQuestions.length} (${percentage.toFixed(1)}%)`,
    });

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
        title: "Email Sent!",
        description: "Check your inbox for detailed test results and feedback.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Email Failed",
        description: "Results were saved but email couldn't be sent. Please contact support.",
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
    const correctCount = answers.filter((answer, index) => 
      answer === aptitudeQuestions[index].correctAnswer
    ).length;
    const percentage = ((correctCount / aptitudeQuestions.length) * 100).toFixed(1);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Flag className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
            <p className="text-muted-foreground">{companyName} - Aptitude Test</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted">
                <div className="text-2xl font-bold">{correctCount}/{aptitudeQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 rounded-xl bg-muted">
                <div className="text-2xl font-bold">{percentage}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="p-4 rounded-xl bg-muted">
                <div className="text-2xl font-bold">{answeredCount}</div>
                <div className="text-sm text-muted-foreground">Attempted</div>
              </div>
            </div>
          </div>

          {isSendingEmail && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-sm text-blue-700">Sending detailed results to {email}...</p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Back to Dashboard
            </Button>
            <Button onClick={() => window.location.reload()}>
              Retake Test
            </Button>
          </div>
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
