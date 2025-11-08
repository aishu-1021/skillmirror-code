import { Target, Brain, TrendingUp, Award } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Realistic Simulations",
    description: "Practice with real-world scenarios from top companies. Experience the complete recruitment process from aptitude tests to final interviews.",
  },
  {
    icon: Brain,
    title: "AI-Driven Interviews",
    description: "Face AI-powered interviewers that adapt to your responses. Get evaluated on communication, confidence, and technical knowledge.",
  },
  {
    icon: TrendingUp,
    title: "Instant Feedback",
    description: "Receive detailed performance analysis after every round. Identify strengths and weaknesses with actionable improvement suggestions.",
  },
  {
    icon: Award,
    title: "Track Your Progress",
    description: "Monitor your improvement across multiple attempts. Earn certificates and badges as you master each interview stage.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-primary">SkillMirror</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive interview preparation platform designed to boost your confidence and land your dream job
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
