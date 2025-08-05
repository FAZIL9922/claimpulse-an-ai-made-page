import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  CheckCircle,
  FileCheck,
  TrendingUp,
  Users,
  BookOpen,
  MessageSquare,
  Info,
  Shield,
  Zap,
  Heart
} from "lucide-react";
import stethoscopeBg from "@/assets/stethoscope-bg.jpg";

// ===========================
// CORE FEATURES ROADMAP
// ===========================
// This component serves as the main landing page and feature directory
// Future development should integrate backend services for each feature

const Home = () => {
  const navigate = useNavigate();

  // TODO: Add analytics tracking for feature navigation
  // Import analytics service: import { trackFeatureClick } from '@/services/analytics';

  const features = [
    {
      icon: Info,
      title: "About ClaimPulse",
      description: "Learn about our vision and how we're revolutionizing healthcare insurance assistance",
      href: "/about",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Upload,
      title: "Upload Policy",
      description: "Upload your insurance policy PDF and get simplified explanations with interactive glossary",
      href: "/upload-policy",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: CheckCircle,
      title: "Treatment Checker",
      description: "Check if your treatment is covered and get suggestions for alternatives",
      href: "/treatment-checker",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FileCheck,
      title: "Documentation Assistant",
      description: "Get help with claim documentation and validate completeness with AI",
      href: "/documentation",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "Claim Success Predictor",
      description: "Estimate your claim approval likelihood and get improvement suggestions",
      href: "/claim-predictor",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Persona-Based EOB",
      description: "Customize your interface for seniors, professionals, families, or analysts",
      href: "/persona-eob",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: BookOpen,
      title: "Insurance Glossary",
      description: "Interactive definitions for insurance terms with examples and explanations",
      href: "/glossary",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Share your experience and help us improve ClaimPulse",
      href: "/feedback",
      gradient: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Home Page Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-8 dark:opacity-5 -z-10" 
        style={{ backgroundImage: `url(${stethoscopeBg})` }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/5 dark:via-secondary/5 dark:to-accent/5">
        <div className="absolute inset-0 gradient-animate opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="h-20 w-20 text-primary animate-pulse-glow" />
                <div className="absolute -top-2 -right-2">
                  <Heart className="h-8 w-8 text-accent animate-bounce" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="gradient-text">ClaimPulse</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Your AI-powered healthcare insurance assistant. Simplifying claims, coverage, and documentation with intelligent insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                onClick={() => navigate("/upload-policy")}
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-transform"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to help you navigate healthcare insurance with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="feature-card group cursor-pointer animate-card-reveal"
                  onClick={() => navigate(feature.href)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">{feature.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-auto w-full group-hover:bg-primary/15 group-hover:text-primary group-hover:shadow-md transition-all duration-300 hover-lift"
                    >
                      <span className="group-hover:mr-2 transition-all duration-300">Explore</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/3 dark:to-secondary/3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-card-foreground font-medium">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">10k+</div>
              <div className="text-card-foreground font-medium">Claims Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-card-foreground font-medium">AI Assistant</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;