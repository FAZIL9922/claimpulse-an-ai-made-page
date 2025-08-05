import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Shield, 
  FileText, 
  Upload, 
  CheckCircle, 
  FileCheck, 
  TrendingUp, 
  Users, 
  BookOpen,
  MessageSquare,
  Info,
  Brain,
  Zap
} from "lucide-react";

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleAiModeToggle = (checked: boolean) => {
    setAiMode(checked);
    if (checked) {
      navigate("/ai-demo");
    } else {
      navigate("/");
    }
  };

  const navigation = [
    { name: "Home", href: "/", icon: Shield },
    { name: "About", href: "/about", icon: Info },
    { name: "Upload Policy", href: "/upload-policy", icon: Upload },
    { name: "Treatment Checker", href: "/treatment-checker", icon: CheckCircle },
    { name: "Documentation Assistant", href: "/documentation", icon: FileCheck },
    { name: "Claim Predictor", href: "/claim-predictor", icon: TrendingUp },
    { name: "Persona EOB", href: "/persona-eob", icon: Users },
    { name: "Glossary", href: "/glossary", icon: BookOpen },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">ClaimPulse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 hover-lift ${
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* AI Mode Toggle & Theme Toggle */}
          <div className="flex items-center space-x-3">
            {/* AI Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Badge variant={aiMode ? "default" : "secondary"} className="text-xs">
                {aiMode ? (
                  <><Brain className="h-3 w-3 mr-1" />AI Mode</>
                ) : (
                  <><Zap className="h-3 w-3 mr-1" />Demo</>
                )}
              </Badge>
              <Switch
                checked={aiMode}
                onCheckedChange={handleAiModeToggle}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Menu Button - Available on all screen sizes */}
            <Button
              variant="outline"
              size="sm"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Full Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full z-50">
            <div className="backdrop-blur-md bg-background/95 shadow-xl border border-border/50 rounded-lg mt-2 mb-4 mx-4 overflow-hidden">
              <div className="px-3 pt-3 pb-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-[1.02] hover-lift ${
                        location.pathname === item.href
                          ? "bg-primary text-primary-foreground shadow-lg border border-primary/30"
                          : "text-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-md dark:hover:border-primary/30 hover:border hover:border-primary/20"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-6 w-6 flex-shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;