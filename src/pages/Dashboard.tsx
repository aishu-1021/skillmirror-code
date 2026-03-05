import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, LogOut, TrendingUp, Award, Clock } from "lucide-react";

import googleLogo from "@/assets/google-logo.png";
import microsoftLogo from "@/assets/microsoft-logo.png";
import amazonLogo from "@/assets/amazon-logo.png";
import appleLogo from "@/assets/apple-logo.png";
import metaLogo from "@/assets/meta-logo.png";
import netflixLogo from "@/assets/netflix-logo.png";
import teslaLogo from "@/assets/tesla-logo.png";
import spotifyLogo from "@/assets/spotify-logo.png";
import adobeLogo from "@/assets/adobe-logo.png";
import ibmLogo from "@/assets/ibm-logo.png";

const companies = [
  { id: 1, name: "Google", role: "Software Engineer", logo: googleLogo, color: "bg-white", isImage: true },
  { id: 2, name: "Microsoft", role: "Full Stack Developer", logo: microsoftLogo, color: "bg-white", isImage: true },
  { id: 3, name: "Amazon", role: "Cloud Engineer", logo: amazonLogo, color: "bg-white", isImage: true },
  { id: 4, name: "Apple", role: "iOS Developer", logo: appleLogo, color: "bg-white", isImage: true },
  { id: 5, name: "Meta", role: "Frontend Engineer", logo: metaLogo, color: "bg-white", isImage: true },
  { id: 6, name: "Netflix", role: "Backend Developer", logo: netflixLogo, color: "bg-white", isImage: true },
  { id: 7, name: "Tesla", role: "Software Engineer", logo: teslaLogo, color: "bg-white", isImage: true },
  { id: 8, name: "Spotify", role: "Data Engineer", logo: spotifyLogo, color: "bg-white", isImage: true },
  { id: 9, name: "Adobe", role: "UI/UX Developer", logo: adobeLogo, color: "bg-white", isImage: true },
  { id: 10, name: "IBM", role: "AI Engineer", logo: ibmLogo, color: "bg-white", isImage: true }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [aptitudeAttempts, setAptitudeAttempts] = useState<any[]>([]);
  const [technicalAttempts, setTechnicalAttempts] = useState<any[]>([]);
  const [rateLimitedAptitude, setRateLimitedAptitude] = useState<string[]>([]);
  const [rateLimitedTechnical, setRateLimitedTechnical] = useState<string[]>([]);

  const completedSimulations = aptitudeAttempts.length + technicalAttempts.length;
  const certificatesEarned = aptitudeAttempts.filter(a => a.passed).length;

  const passedAptitudeCompanies = aptitudeAttempts
    .filter(a => a.passed === true)
    .map(a => a.companyName);

  // ✅ Helper to calculate rate limited companies from attempts
  const getRateLimited = (data: any[]) => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const companyCounts: { [key: string]: number } = {};
    data.forEach((attempt: any) => {
      const attemptTime = new Date(attempt.attemptedAt);
      if (attemptTime >= oneHourAgo) {
        companyCounts[attempt.companyName] =
          (companyCounts[attempt.companyName] || 0) + 1;
      }
    });

    return Object.entries(companyCounts)
      .filter(([_, count]) => (count as number) >= 2)
      .map(([company]) => company);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user?.id || !token) {
      navigate("/login");
      return;
    }

    const headers = { "Authorization": `Bearer ${token}` };

    // ✅ Fetch both aptitude and technical attempts
    Promise.all([
      fetch(`http://localhost:8080/api/aptitude/user/${user.id}`, { headers }),
      fetch(`http://localhost:8080/api/technical/user/${user.id}`, { headers })
    ])
      .then(async ([aptRes, techRes]) => {
        const aptData = aptRes.ok ? await aptRes.json() : [];
        const techData = techRes.ok ? await techRes.json() : [];

        console.log("Aptitude Attempts:", aptData);
        console.log("Technical Attempts:", techData);

        setAptitudeAttempts(aptData);
        setTechnicalAttempts(techData);
        setRateLimitedAptitude(getRateLimited(aptData));
        setRateLimitedTechnical(getRateLimited(techData));
      })
      .catch(err => console.error("Error fetching attempts:", err));
  }, [navigate]);

  const hasPassedAptitude = (companyName: string) => {
    return aptitudeAttempts.some(
      a => a.companyName === companyName && a.passed === true
    );
  };

  const hasPassedTechnical = (companyName: string) => {
    return technicalAttempts.some(
      a => a.companyName === companyName && a.passed === true
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent">
              SkillMirror
            </span>
          </Link>

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">

        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Candidate!</h1>
          <p className="text-muted-foreground text-lg">
            Choose a company and start your interview simulation
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-light-blue/10 border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">{completedSimulations}</div>
                <div className="text-sm text-muted-foreground">Simulations Completed</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{certificatesEarned}</div>
                <div className="text-sm text-muted-foreground">Certificates Earned</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-orange-600 flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">0h</div>
                <div className="text-sm text-muted-foreground">Practice Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Companies</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies.map(company => (
              <div
                key={company.id}
                className="group p-6 rounded-2xl bg-card border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`h-16 w-16 rounded-2xl ${company.color} flex items-center justify-center mb-4`}>
                  <img src={company.logo} alt={company.name} className="h-12 object-contain" />
                </div>

                <h3 className="text-xl font-bold mb-1">{company.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{company.role}</p>

                {/* ✅ Full flow: aptitude → technical → locked states for both */}
                {hasPassedTechnical(company.name) ? (
                  // Passed technical — show interview button (future)
                  <Button className="w-full" disabled variant="outline">
                    🎉 Interview Round Coming Soon
                  </Button>
                ) : hasPassedAptitude(company.name) ? (
                  // Passed aptitude — check if technical is rate limited
                  rateLimitedTechnical.includes(company.name) ? (
                    <Button className="w-full" disabled variant="outline">
                      🔒 Locked — Try Again in 1 Hour
                    </Button>
                  ) : (
                    <Link to={`/technical-round/${encodeURIComponent(company.name)}`}>
                      <Button className="w-full">Start Technical Round</Button>
                    </Link>
                  )
                ) : rateLimitedAptitude.includes(company.name) ? (
                  // Aptitude rate limited
                  <Button className="w-full" disabled variant="outline">
                    🔒 Locked — Try Again in 1 Hour
                  </Button>
                ) : (
                  // Default — start aptitude
                  <Link to={`/aptitude-test/${encodeURIComponent(company.name)}`}>
                    <Button variant="outline" className="w-full">
                      Start Aptitude Test
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-12 p-8 rounded-2xl bg-card border border-border">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>

          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-full bg-muted text-sm">
              🎯 Aptitude: {aptitudeAttempts.length > 0 ? "Completed" : "Not started"}
            </div>
            <div className="px-3 py-1 rounded-full bg-muted text-sm">
              💻 Technical: {passedAptitudeCompanies.length > 0 ? "Unlocked" : "Locked"}
            </div>
            <div className="px-3 py-1 rounded-full bg-muted text-sm">🧠 Managerial: Locked</div>
            <div className="px-3 py-1 rounded-full bg-muted text-sm">🤝 HR: Locked</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;