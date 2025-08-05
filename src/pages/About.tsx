import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Users, Target, Mail, Github, Linkedin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Header */}
      <div className="text-center py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            About ClaimPulse
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing healthcare insurance navigation through AI-powered assistance, 
            making complex insurance processes simple and accessible for everyone.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Healthcare insurance shouldn't be a maze of confusion. ClaimPulse envisions a world 
                where every individual can confidently navigate their insurance benefits, understand 
                their coverage, and make informed healthcare decisions.
              </p>
              <p className="text-lg text-muted-foreground">
                We leverage cutting-edge AI technology to transform complex insurance documents 
                into clear, actionable insights, empowering users to take control of their healthcare journey.
              </p>
            </div>
            <Card className="feature-card">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To democratize healthcare insurance knowledge through intelligent automation, 
                  ensuring no one is left behind in understanding their coverage and rights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Patient Advocacy",
                description: "Help patients understand their coverage before medical procedures"
              },
              {
                icon: Users,
                title: "Family Planning",
                description: "Assist families in choosing the right insurance plans for their needs"
              },
              {
                icon: Shield,
                title: "Claim Preparation",
                description: "Ensure all documentation is complete before submitting claims"
              }
            ].map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="feature-card">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact & Credits */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact */}
            <Card className="feature-card">
              <CardContent className="p-8">
                <Mail className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <p>
                    <strong>Email:</strong> contact@claimpulse.com
                  </p>
                  <p>
                    <strong>Support:</strong> support@claimpulse.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Healthcare Ave, Medical District, NY 10001
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Developer Credits */}
            <Card className="feature-card">
              <CardContent className="p-8">
                <Users className="h-8 w-8 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Development Team</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div>
                      <p className="font-semibold">AI Development Team</p>
                      <p className="text-sm text-muted-foreground">Full-stack AI Implementation</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <Github className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                    <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;