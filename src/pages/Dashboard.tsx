import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, LogOut, TrendingUp, Award, Clock } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import microsoftLogo from "@/assets/microsoft-logo.png";
import amazonLogo from "@/assets/amazon-logo.png";
import appleLogo from "@/assets/apple-logo.png";
const companies = [{
  id: 1,
  name: "Google",
  role: "Software Engineer",
  logo: googleLogo,
  color: "bg-white",
  isImage: true
}, {
  id: 2,
  name: "Microsoft",
  role: "Full Stack Developer",
  logo: microsoftLogo,
  color: "bg-white",
  isImage: true
}, {
  id: 3,
  name: "Amazon",
  role: "Cloud Engineer",
  logo: amazonLogo,
  color: "bg-white",
  isImage: true
}, {
  id: 4,
  name: "Apple",
  role: "iOS Developer",
  logo: appleLogo,
  color: "bg-white",
  isImage: true
}, {
  id: 5,
  name: "Meta",
  role: "Frontend Engineer",
  logo: "📘",
  color: "from-blue-600 to-blue-700"
}, {
  id: 6,
  name: "Netflix",
  role: "Backend Developer",
  logo: "🎬",
  color: "from-red-600 to-red-700"
}, {
  id: 7,
  name: "Tesla",
  role: "Software Engineer",
  logo: "⚡",
  color: "from-red-500 to-red-600"
}, {
  id: 8,
  name: "Spotify",
  role: "Data Engineer",
  logo: "🎵",
  color: "from-green-600 to-green-700"
}, {
  id: 9,
  name: "Adobe",
  role: "UI/UX Developer",
  logo: "🎨",
  color: "from-red-600 to-pink-600"
}, {
  id: 10,
  name: "IBM",
  role: "AI Engineer",
  logo: "💼",
  color: "from-blue-700 to-blue-800"
}];
const Dashboard = () => {
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent">
                SkillMirror
              </span>
            </Link>
            
            <Link to="/">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Candidate!</h1>
          <p className="text-muted-foreground text-lg">Choose a company and start your interview simulation</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-light-blue/10 border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
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
                <div className="text-2xl font-bold">0</div>
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

        {/* Companies Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Companies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies.map(company => <div key={company.id} className="group p-6 rounded-2xl bg-card border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className={`h-16 w-16 rounded-2xl ${company.isImage ? company.color : `bg-gradient-to-br ${company.color}`} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {company.isImage ? <img src={company.logo} alt={`${company.name} logo`} className="max-w-12 h-12 object-contain" /> : company.logo}
                </div>
                <h3 className="text-xl font-bold mb-1">{company.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{company.role}</p>
                <Button variant="outline" className="w-full">
                  Start Mock Test
                </Button>
              </div>)}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-12 p-8 rounded-2xl bg-card border border-border">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <p className="text-muted-foreground mb-6">
            You haven't started any simulations yet. Choose a company above to begin your interview practice journey!
          </p>
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-full bg-muted text-sm">🎯 Aptitude: Not started</div>
            <div className="px-3 py-1 rounded-full bg-muted text-sm">💻 Technical: Locked</div>
            <div className="px-3 py-1 rounded-full bg-muted text-sm">🧠 Managerial: Locked</div>
            <div className="px-3 py-1 rounded-full bg-muted text-sm">🤝 HR: Locked</div>
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;