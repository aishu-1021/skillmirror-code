import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-sky via-background to-brand-sky/30 -z-10" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered Interview Practice</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Practice. Perform.{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-light-blue bg-clip-text text-transparent">
                Perfect
              </span>{" "}
              your job interview skills.
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Experience realistic job recruitment simulations with AI-driven interviews, 
              instant feedback, and personalized learning paths. Master every round from 
              aptitude tests to HR interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button variant="hero" size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Explore Companies
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Top Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Interview Rounds</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">AI</div>
                <div className="text-sm text-muted-foreground">Powered Feedback</div>
              </div>
            </div>
          </div>
          
          {/* Right content - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-light-blue/20 rounded-3xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="Professional interview preparation" 
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
