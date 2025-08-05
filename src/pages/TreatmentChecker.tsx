import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, Search, Heart, DollarSign, Clock, RotateCcw } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTestCases } from "@/hooks/useTestCases";

// ===========================
// TREATMENT CHECKER MODULE
// ===========================
// This module checks treatment coverage and suggests alternatives
// TODO: Integrate with insurance provider APIs and treatment databases

// Import additional modules or services here:
// import { InsuranceProviderAPI } from '@/api/insuranceProvider'
// import { TreatmentDatabaseService } from '@/services/treatmentDatabase'
// import { CoverageCalculatorService } from '@/services/coverageCalculator'

const TreatmentChecker = () => {
  const [treatment, setTreatment] = useState("");
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();
  const { testCases, currentTestCase, nextTestCase, currentIndex } = useTestCases('treatment-checker');

  const handleCheck = async () => {
    if (!treatment.trim()) {
      toast({
        title: "Treatment Required",
        description: "Please enter a treatment or procedure to check.",
        variant: "destructive"
      });
      return;
    }

    setChecking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Use test case data or mock results
    const testCaseResult = currentTestCase ? {
      ...currentTestCase.mockData,
      treatment: treatment
    } : {
      treatment: treatment,
      covered: treatment.toLowerCase().includes("physical therapy") || 
               treatment.toLowerCase().includes("mri") ||
               treatment.toLowerCase().includes("consultation"),
      coveragePercentage: treatment.toLowerCase().includes("physical therapy") ? 80 : 
                         treatment.toLowerCase().includes("mri") ? 70 : 90,
      estimatedCost: Math.floor(Math.random() * 5000) + 500,
      copay: Math.floor(Math.random() * 100) + 25,
      deductibleApplies: Math.random() > 0.5,
      alternatives: [
        {
          name: "Alternative Treatment A",
          coverage: 90,
          cost: Math.floor(Math.random() * 3000) + 300,
          description: "A covered alternative with better coverage"
        },
        {
          name: "Alternative Treatment B",
          coverage: 85,
          cost: Math.floor(Math.random() * 2500) + 250,
          description: "Another option with good coverage"
        }
      ],
      requirements: [
        "Prior authorization required",
        "Referral from primary care physician",
        "Must try conservative treatment first"
      ]
    };

    setResults(testCaseResult);
    setChecking(false);

    // Auto-cycle to next test case
    setTimeout(() => {
      nextTestCase();
    }, 1000);

    toast({
      title: "Coverage Check Complete",
      description: currentTestCase ? `Test Case ${currentIndex + 1}: ${currentTestCase.name}` : `Found coverage information for ${treatment}`
    });
  };

  const resetCheck = () => {
    setTreatment("");
    setResults(null);
  };

  return (
    <div className="min-h-screen pt-16 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-4xl font-bold mb-4 gradient-text">Treatment Coverage Checker</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Check if your treatment is covered by your insurance and discover alternatives with better coverage.
          </p>
          
          {/* Test Case Info */}
          {currentTestCase && (
            <div className="mt-6 max-w-2xl mx-auto">
              <Badge variant="outline" className="mb-2">
                Test Case {currentIndex + 1} of {testCases.length}
              </Badge>
              <div className="text-sm text-muted-foreground">
                <strong>{currentTestCase.name}:</strong> {currentTestCase.description}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <Card className="feature-card lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Check Treatment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="treatment">Treatment or Procedure</Label>
                <Input
                  id="treatment"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  placeholder="e.g., MRI scan, Physical therapy, Surgery..."
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleCheck}
                disabled={checking || !treatment.trim()}
                className="w-full"
              >
                {checking ? "Checking Coverage..." : "Check Coverage"}
              </Button>

              {checking && (
                <div className="mt-4">
                  <LoadingSpinner text="AI Analyzing..." size="sm" />
                </div>
              )}

              {results && (
                <Button variant="outline" onClick={resetCheck} className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Search
                </Button>
              )}

              {/* Quick Examples */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Quick Examples:</p>
                <div className="space-y-1">
                  {["Physical Therapy", "MRI Scan", "Cardiology Consultation", "Emergency Surgery"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setTreatment(example)}
                      className="text-sm text-primary hover:underline block"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {!results ? (
              <Card className="feature-card">
                <CardContent className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Enter a treatment to check coverage</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Coverage Status */}
                <Card className="feature-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {results.covered ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <span>Coverage Status for "{results.treatment}"</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {results.coveragePercentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">Coverage</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/10 rounded-lg">
                        <div className="text-2xl font-bold text-secondary mb-1 flex items-center justify-center">
                          <DollarSign className="h-5 w-5" />
                          {results.estimatedCost}
                        </div>
                        <div className="text-sm text-muted-foreground">Est. Total Cost</div>
                      </div>
                      <div className="text-center p-4 bg-accent/10 rounded-lg">
                        <div className="text-2xl font-bold text-accent mb-1 flex items-center justify-center">
                          <DollarSign className="h-5 w-5" />
                          {results.copay}
                        </div>
                        <div className="text-sm text-muted-foreground">Your Copay</div>
                      </div>
                    </div>

                    {results.requirements && results.requirements.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Requirements:
                        </h4>
                        <ul className="space-y-1">
                          {results.requirements.map((req: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start">
                              <span className="mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Alternatives */}
                {results.alternatives && results.alternatives.length > 0 && (
                  <Card className="feature-card">
                    <CardHeader>
                      <CardTitle>Alternative Treatments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.alternatives.map((alt: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{alt.name}</h4>
                              <div className="text-right">
                                <div className="text-sm font-medium text-green-600">
                                  {alt.coverage}% covered
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Est. cost: ${alt.cost}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{alt.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentChecker;