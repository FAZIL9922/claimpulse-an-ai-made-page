import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles } from "lucide-react";

const AIDemoPage = () => {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Brain className="h-24 w-24 text-primary animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-8 w-8 text-accent animate-bounce" />
              </div>
            </div>
          </div>
          
          <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
            AI Mode: Coming Soon...
          </Badge>
          
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            Advanced AI Mode
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the next generation of healthcare insurance assistance with advanced AI capabilities, 
            real-time processing, and personalized insights.
          </p>
          
          <Card className="feature-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Coming Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <div className="font-medium">🤖 Real-time AI Analysis</div>
                  <div className="font-medium">📊 Advanced Analytics</div>
                  <div className="font-medium">🔍 Smart Document Recognition</div>
                  <div className="font-medium">💡 Predictive Insights</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">🎯 Personalized Recommendations</div>
                  <div className="font-medium">🔐 Enhanced Security</div>
                  <div className="font-medium">⚡ Lightning Fast Processing</div>
                  <div className="font-medium">📱 Multi-platform Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-12 text-sm text-muted-foreground">
            Stay tuned for revolutionary AI-powered healthcare assistance
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDemoPage;