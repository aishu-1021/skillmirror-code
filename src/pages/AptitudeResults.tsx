import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Target, ChevronDown, ChevronUp, ExternalLink, RotateCcw,
  LayoutDashboard, Trophy, XCircle, CheckCircle, AlertCircle, BookOpen,
} from "lucide-react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export interface AptitudeResultsState {
  companyName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  categoryStats: { [key: string]: { total: number; correct: number; wrong: number } };
  wrongAnswers: {
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
    questionIndex: number;
  }[];
  resources: { category: string; links: { label: string; url: string }[] }[];
}

const COLORS = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

const Confetti = () => {
  const pieces = Array.from({ length: 72 });
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const colors = ["#2563eb", "#16a34a", "#d97706", "#f43f5e", "#7c3aed", "#0891b2", "#fbbf24"];
        const color = colors[i % colors.length];
        const left = `${(i / pieces.length) * 100 + (Math.random() * 4 - 2)}%`;
        const delay = `${(i / pieces.length) * 2.5}s`;
        const duration = `${2.8 + Math.random() * 1.5}s`;
        const size = `${5 + Math.random() * 7}px`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "-20px",
              left,
              width: size,
              height: size,
              background: color,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
              animation: `confettiFall ${duration} ${delay} ease-in forwards`,
              opacity: 0,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFall {
          0%   { top: -20px; opacity: 1; transform: rotate(0deg) translateX(0px); }
          100% { top: 110vh; opacity: 0; transform: rotate(540deg) translateX(40px); }
        }
      `}</style>
    </div>
  );
};

const ScoreRing = ({ percentage, passed }: { percentage: number; passed: boolean }) => {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const [dash, setDash] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setDash((percentage / 100) * circ), 400);
    return () => clearTimeout(t);
  }, [percentage, circ]);
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={radius} fill="none"
        stroke="white" strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - dash}
        transform="rotate(-90 70 70)"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text x="70" y="65" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="inherit">
        {percentage.toFixed(0)}%
      </text>
      <text x="70" y="82" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="inherit" letterSpacing="1">
        {passed ? "PASSED" : "FAILED"}
      </text>
    </svg>
  );
};

const AptitudeResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as AptitudeResultsState;
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [expandedWrong, setExpandedWrong] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

  useEffect(() => { if (!state) navigate("/dashboard"); }, [state]);

  useEffect(() => {
    if (!state) return;
    const t = setTimeout(() => {
      setAnimateScore(true);
      if (state.passed) setShowConfetti(true);
    }, 200);
    return () => clearTimeout(t);
  }, [state]);

  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (!state || !chartRef.current) return;
    chartInstanceRef.current?.destroy();
    const entries = Object.entries(state.categoryStats);
    const labels = entries.map(([cat]) => cat);
    const data = entries.map(([, d]) => d.total);
    const bg = entries.map((_, i) => COLORS[i % COLORS.length] + "cc");
    const border = entries.map((_, i) => COLORS[i % COLORS.length]);

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: { labels, datasets: [{ data, backgroundColor: bg, borderColor: border, borderWidth: 2, hoverBackgroundColor: border, hoverBorderWidth: 3, hoverOffset: 14 }] },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: "66%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f172a", titleColor: "#f8fafc", bodyColor: "#94a3b8", padding: 12, cornerRadius: 8,
            callbacks: {
              label: (ctx) => {
                const cat = labels[ctx.dataIndex];
                const d = state.categoryStats[cat];
                const pct = Math.round((d.correct / d.total) * 100);
                return [` Questions: ${d.total}`, ` Correct: ${d.correct} (${pct}%)`, ` Wrong: ${d.wrong}`];
              },
            },
          },
        },
        animation: { animateRotate: true, duration: 1000 },
      },
    });
    return () => { chartInstanceRef.current?.destroy(); };
  }, [state]);

  if (!state) return null;
  const { companyName, score, totalQuestions, percentage, passed, categoryStats, wrongAnswers, resources } = state;
  const entries = Object.entries(categoryStats);

  return (
    <div className="min-h-screen bg-slate-50">
      {showConfetti && <Confetti />}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
              <Target className="text-white" style={{ height: "16px", width: "16px" }} />
            </div>
            <span className="text-base font-bold text-slate-800 tracking-tight">SkillMirror</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
            <span className="text-slate-400">{companyName}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Aptitude Results</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-slate-600 border-slate-200" onClick={() => navigate("/dashboard")}>
              <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" /> Dashboard
            </Button>
            <Button size="sm" onClick={() => navigate(`/aptitude-test/${encodeURIComponent(companyName)}`)}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Retake
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-5">

        {/* ── HERO ── */}
        <div className={`rounded-2xl overflow-hidden transition-all duration-700 ${animateScore ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className={`relative p-8 ${passed ? "bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500" : "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500"}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row items-center gap-8">

              <div className="flex-shrink-0">
                <ScoreRing percentage={percentage} passed={passed} />
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
                  Aptitude Round · {companyName}
                </p>
                <h1 className="text-3xl font-black text-white mb-2 leading-tight">
                  {passed ? "Round Cleared" : "Keep Going"}
                </h1>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                  {passed
                    ? "You've qualified for the Technical Round. A detailed report has been sent to your email."
                    : "Review your weak areas below, practice, and try again. You're making progress."}
                </p>
              </div>

              <div className="flex-shrink-0 text-center bg-white/10 backdrop-blur-sm rounded-xl px-8 py-5 border border-white/15">
                <div className="text-5xl font-black text-white tabular-nums leading-none">{score}</div>
                <div className="text-white/50 text-sm mt-1">out of {totalQuestions}</div>
                <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  passed ? "bg-emerald-500/30 text-emerald-200" : "bg-red-400/30 text-red-200"
                }`}>
                  {passed ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                  {passed ? "PASSED" : "FAILED"}
                </div>
              </div>
            </div>

            {/* Score bar */}
            <div className="relative mt-7">
              <div className="flex justify-between text-xs text-white/40 mb-1.5">
                <span>0%</span>
                <span className="text-white/55">Pass mark: 75%</span>
                <span>100%</span>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-1000 ease-out"
                  style={{ width: animateScore ? `${Math.min(percentage, 100)}%` : "0%" }}
                />
              </div>
              <div className="absolute w-px bg-white/40" style={{ left: "75%", top: "1.25rem", height: "20px" }} />
            </div>
          </div>
        </div>

        {/* ── CHART + CATEGORY SCORES ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-6 border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Category Breakdown</p>
            <div className="relative h-52">
              <canvas ref={chartRef} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800">{percentage.toFixed(0)}%</span>
                <span className="text-xs text-slate-400 mt-0.5">Overall</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center mt-4">Hover over segments for details</p>
          </Card>

          <Card className="p-6 border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Category Scores</p>
            <div className="space-y-4">
              {entries.map(([category, data], i) => {
                const pct = Math.round((data.correct / data.total) * 100);
                const color = COLORS[i % COLORS.length];
                const StatusIcon = pct >= 75 ? CheckCircle : pct >= 50 ? AlertCircle : XCircle;
                const statusColor = pct >= 75 ? "text-emerald-500" : pct >= 50 ? "text-amber-500" : "text-red-400";
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-3.5 w-3.5 ${statusColor}`} />
                        <span className="text-sm font-medium text-slate-700">{category}</span>
                      </div>
                      <span className="text-sm font-bold tabular-nums" style={{ color }}>
                        {data.correct}/{data.total}
                        <span className="text-xs font-normal text-slate-400 ml-1">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 delay-300"
                        style={{ width: animateScore ? `${pct}%` : "0%", background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── WRONG ANSWERS ── */}
        {wrongAnswers.length > 0 && (
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Incorrect Answers</p>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {wrongAnswers.length} {wrongAnswers.length === 1 ? "question" : "questions"}
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {wrongAnswers.map((wa, i) => (
                <div key={i}>
                  <button
                    className="w-full text-left px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedWrong(expandedWrong === i ? null : i)}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="flex-shrink-0 text-xs font-bold text-slate-400 mt-0.5 w-7">Q{wa.questionIndex + 1}</span>
                      <p className="text-sm text-slate-700 leading-snug font-medium">{wa.questionText}</p>
                    </div>
                    {expandedWrong === i
                      ? <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      : <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    }
                  </button>

                  {expandedWrong === i && (
                    <div className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/70">
                      <div className="p-3.5 rounded-lg bg-red-50 border border-red-100">
                        <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1.5">Your Answer</p>
                        <p className="text-sm text-red-700 font-medium">{wa.userAnswer}</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-100">
                        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide mb-1.5">Correct Answer</p>
                        <p className="text-sm text-emerald-700 font-medium">{wa.correctAnswer}</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-100">
                        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1.5">Explanation</p>
                        <p className="text-sm text-blue-800 leading-relaxed">{wa.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ── RESOURCES ── */}
        {resources.length > 0 && (
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <BookOpen className="h-4 w-4 text-slate-400" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommended Resources</p>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.map((r, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm transition-all">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">{r.category}</p>
                  <div className="space-y-2">
                    {r.links.map((link, j) => (
                      <a key={j} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors group">
                        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="hover:underline underline-offset-2">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ── ACTIONS ── */}
        <div className="flex gap-3 justify-center pb-10">
          <Button variant="outline" size="lg" className="border-slate-200 text-slate-600" onClick={() => navigate("/dashboard")}>
            <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
          </Button>
          <Button size="lg" onClick={() => navigate(`/aptitude-test/${encodeURIComponent(companyName)}`)}>
            <RotateCcw className="h-4 w-4 mr-2" /> Retake Test
          </Button>
        </div>

      </div>
    </div>
  );
};
export default AptitudeResults;