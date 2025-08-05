import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, User, Briefcase, Home, BarChart3, Eye, DollarSign, Calendar, Upload, FileText } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTestCases } from "@/hooks/useTestCases";
import { useToast } from "@/hooks/use-toast";

const PersonaEOB = () => {
  const [selectedPersona, setSelectedPersona] = useState("family");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { testCases, currentTestCase, nextTestCase } = useTestCases('persona-eob');

  const personas = [
    {
      id: "senior",
      name: "Senior",
      icon: "🧓",
      description: "Large fonts, simple navigation, clear explanations",
      features: ["Large text", "High contrast", "Voice narration", "Simple layout"]
    },
    {
      id: "professional",
      name: "Professional",
      icon: "💼", 
      description: "Detailed data, comprehensive analysis, quick access",
      features: ["Detailed tables", "Export options", "Quick filters", "Analytics"]
    },
    {
      id: "family",
      name: "Family",
      icon: "👨‍👩‍👧",
      description: "Family-friendly interface with visual aids and summaries",
      features: ["Visual summaries", "Family plans", "Cost breakdowns", "Kid-friendly"]
    },
    {
      id: "analyst",
      name: "Analyst",
      icon: "📊",
      description: "Advanced analytics, trends, and detailed reporting",
      features: ["Advanced charts", "Trend analysis", "Data export", "Comparisons"]
    }
  ];

  // Get current EOB data from test case or use default
  const getCurrentEOBData = () => {
    if (currentTestCase && currentTestCase.mockData.patientName) {
      return currentTestCase.mockData;
    }
    
    // Default mock EOB data
    return {
      patientName: "John Doe",
      claimNumber: "CLM-2024-001234",
      serviceDate: "2024-01-15",
      provider: "Metropolitan Medical Center",
      services: [
        {
          description: "Office Visit - Level 4",
          code: "99214",
          charges: 350.00,
          allowedAmount: 280.00,
          deductible: 50.00,
          copay: 30.00,
          coinsurance: 40.00,
          paidByInsurance: 160.00,
          patientResponsibility: 120.00
        },
        {
          description: "Blood Test - Comprehensive",
          code: "80053",
          charges: 150.00,
          allowedAmount: 120.00,
          deductible: 0.00,
          copay: 0.00,
          coinsurance: 24.00,
          paidByInsurance: 96.00,
          patientResponsibility: 24.00
        }
      ],
      totals: {
        totalCharges: 500.00,
        totalAllowed: 400.00,
        totalDeductible: 50.00,
        totalCopay: 30.00,
        totalCoinsurance: 64.00,
        totalPaidByInsurance: 256.00,
        totalPatientResponsibility: 144.00
      }
    };
  };

  const eobData = getCurrentEOBData();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsLoading(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Get next test case for varied sample data
      const testCase = nextTestCase();
      
      // Show success message
      toast({
        title: "Document Analyzed Successfully",
        description: `EOB processed - ${testCase.name}. Select a mode to view the data.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSeniorView = () => (
    <div className="space-y-8">
      <Card className="feature-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl">Your Medical Bill Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="text-center p-6 bg-primary/10 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">
                ${eobData.totals.totalPatientResponsibility.toFixed(2)}
              </div>
              <div className="text-xl text-muted-foreground">You Need to Pay</div>
            </div>
            
            <div className="text-center p-6 bg-green-100 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                ${eobData.totals.totalPaidByInsurance.toFixed(2)}
              </div>
              <div className="text-xl text-muted-foreground">Insurance Paid</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Services You Received:</h3>
            {eobData.services.map((service, index) => (
              <div key={index} className="border-2 rounded-lg p-4 space-y-2">
                <div className="text-xl font-medium">{service.description}</div>
                <div className="text-lg">You pay: <span className="font-bold text-primary">${service.patientResponsibility.toFixed(2)}</span></div>
                <div className="text-lg">Insurance paid: <span className="font-bold text-green-600">${service.paidByInsurance.toFixed(2)}</span></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfessionalView = () => (
    <div className="space-y-6">
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Explanation of Benefits - {eobData.claimNumber}</span>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Service</th>
                  <th className="text-right p-2">Charges</th>
                  <th className="text-right p-2">Allowed</th>
                  <th className="text-right p-2">Deductible</th>
                  <th className="text-right p-2">Copay</th>
                  <th className="text-right p-2">Coinsurance</th>
                  <th className="text-right p-2">Insurance Paid</th>
                  <th className="text-right p-2">Patient Responsibility</th>
                </tr>
              </thead>
              <tbody>
                {eobData.services.map((service, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">
                      <div className="font-medium">{service.description}</div>
                      <div className="text-muted-foreground">{service.code}</div>
                    </td>
                    <td className="text-right p-2">${service.charges.toFixed(2)}</td>
                    <td className="text-right p-2">${service.allowedAmount.toFixed(2)}</td>
                    <td className="text-right p-2">${service.deductible.toFixed(2)}</td>
                    <td className="text-right p-2">${service.copay.toFixed(2)}</td>
                    <td className="text-right p-2">${service.coinsurance.toFixed(2)}</td>
                    <td className="text-right p-2 text-green-600 font-medium">${service.paidByInsurance.toFixed(2)}</td>
                    <td className="text-right p-2 text-primary font-medium">${service.patientResponsibility.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-b-2 border-primary font-bold">
                  <td className="p-2">TOTALS</td>
                  <td className="text-right p-2">${eobData.totals.totalCharges.toFixed(2)}</td>
                  <td className="text-right p-2">${eobData.totals.totalAllowed.toFixed(2)}</td>
                  <td className="text-right p-2">${eobData.totals.totalDeductible.toFixed(2)}</td>
                  <td className="text-right p-2">${eobData.totals.totalCopay.toFixed(2)}</td>
                  <td className="text-right p-2">${eobData.totals.totalCoinsurance.toFixed(2)}</td>
                  <td className="text-right p-2 text-green-600">${eobData.totals.totalPaidByInsurance.toFixed(2)}</td>
                  <td className="text-right p-2 text-primary">${eobData.totals.totalPatientResponsibility.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFamilyView = () => (
    <div className="space-y-6">
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Home className="h-6 w-6 mr-2" />
            Family Medical Bill for {eobData.patientName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">${eobData.totals.totalCharges.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Bill</div>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${eobData.totals.totalPaidByInsurance.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Insurance Helped</div>
            </div>
            <div className="text-center p-4 bg-orange-100 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">${eobData.totals.totalPatientResponsibility.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Your Part</div>
            </div>
          </div>

          {/* Service Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What happened at your visit:</h3>
            {eobData.services.map((service, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-lg">{service.description}</div>
                    <div className="text-muted-foreground">Service code: {service.code}</div>
                  </div>
                  <Badge variant="secondary">Visit {index + 1}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Insurance paid:</div>
                    <div className="text-lg font-semibold text-green-600">${service.paidByInsurance.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">You pay:</div>
                    <div className="text-lg font-semibold text-primary">${service.patientResponsibility.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalystView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="feature-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Utilization Rate</div>
                <div className="text-2xl font-bold">64%</div>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="feature-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Cost Efficiency</div>
                <div className="text-2xl font-bold">80%</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="feature-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
                <div className="text-2xl font-bold">3.2d</div>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="feature-card">
        <CardHeader>
          <CardTitle>Advanced Claims Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Cost Analysis */}
            <div>
              <h4 className="font-semibold mb-3">Cost Breakdown Analysis</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded">
                  <div className="text-lg font-bold">${(eobData.totals.totalCharges - eobData.totals.totalAllowed).toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Provider Discount</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-lg font-bold">{((eobData.totals.totalPaidByInsurance / eobData.totals.totalAllowed) * 100).toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Insurance Coverage</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-lg font-bold">{((eobData.totals.totalPatientResponsibility / eobData.totals.totalAllowed) * 100).toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Patient Share</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-lg font-bold">{eobData.services.length}</div>
                  <div className="text-xs text-muted-foreground">Service Lines</div>
                </div>
              </div>
            </div>

            {/* Detailed Table */}
            <div>
              <h4 className="font-semibold mb-3">Service Line Analysis</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Service</th>
                      <th className="border p-2 text-right">Charge Rate</th>
                      <th className="border p-2 text-right">Allow Rate</th>
                      <th className="border p-2 text-right">Patient %</th>
                      <th className="border p-2 text-right">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eobData.services.map((service, index) => (
                      <tr key={index}>
                        <td className="border p-2">{service.description}</td>
                        <td className="border p-2 text-right">{((service.allowedAmount / service.charges) * 100).toFixed(1)}%</td>
                        <td className="border p-2 text-right">{((service.paidByInsurance / service.allowedAmount) * 100).toFixed(1)}%</td>
                        <td className="border p-2 text-right">{((service.patientResponsibility / service.allowedAmount) * 100).toFixed(1)}%</td>
                        <td className="border p-2 text-right">
                          <Badge variant={service.patientResponsibility < 50 ? "default" : "secondary"}>
                            {service.patientResponsibility < 50 ? "High" : "Standard"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPersonaContent = () => {
    switch (selectedPersona) {
      case "senior": return renderSeniorView();
      case "professional": return renderProfessionalView();
      case "family": return renderFamilyView();
      case "analyst": return renderAnalystView();
      default: return renderFamilyView();
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-4xl font-bold mb-4 gradient-text">Persona-Based EOB</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your interface mode to see explanations of benefits tailored to your needs and preferences.
          </p>
        </div>

        {/* File Upload Section */}
        <Card className="feature-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload EOB Document</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg font-medium mb-2">Drop your EOB document here</div>
                <div className="text-muted-foreground mb-4">or click to browse files</div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Select File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              {uploadedFile && (
                <div className="text-center text-sm text-muted-foreground">
                  Selected: {uploadedFile.name}
                </div>
              )}
              {currentTestCase && (
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Current Test Case:</div>
                  <div className="font-semibold">{currentTestCase.name}</div>
                  <div className="text-sm text-muted-foreground">{currentTestCase.description}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <LoadingSpinner text="AI Analyzing..." />
          </div>
        )}

        {/* Persona Selection */}
        {!isLoading && (
          <Card className="feature-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Choose Your View</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {personas.map((persona) => (
                  <button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className={`p-6 text-left border rounded-lg transition-all hover:scale-105 ${
                      selectedPersona === persona.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{persona.icon}</div>
                    <div className="font-semibold mb-2">{persona.name}</div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {persona.description}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {persona.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dynamic Content */}
        {!isLoading && (
          <div className="animate-fade-in-up">
            {renderPersonaContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaEOB;