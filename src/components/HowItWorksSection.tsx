import { Target, Code, Users, Briefcase } from "lucide-react";

const steps = [
  {
    icon: Target,
    emoji: "🎯",
    title: "Aptitude Round",
    description: "Test your logical reasoning and problem-solving skills. Score 80% or higher to advance.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    emoji: "💻",
    title: "Technical Round",
    description: "Showcase your technical expertise with coding challenges. Need 85% to qualify for interviews.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    emoji: "🧠",
    title: "Managerial Interview",
    description: "Face AI-driven situational questions. Demonstrate leadership and decision-making abilities.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Briefcase,
    emoji: "🤝",
    title: "HR Interview",
    description: "Final behavioral assessment. Prove your cultural fit and receive your completion certificate.",
    color: "from-green-500 to-teal-500",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete all four rounds to master the complete recruitment process
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="relative p-6 rounded-2xl bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 group">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-primary-foreground">{index + 1}</span>
                </div>
                
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {step.emoji}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-brand-blue/10 to-brand-light-blue/10 border border-primary/20">
            <p className="text-lg font-medium">
              ✨ Receive <span className="text-primary font-bold">detailed email feedback</span> after each round with personalized improvement tips
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
