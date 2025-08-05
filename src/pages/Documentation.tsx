import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileCheck, Upload, CheckCircle, AlertCircle, FileText, Calendar } from "lucide-react";

// ===========================
// DOCUMENTATION ASSISTANT MODULE
// ===========================
// This module assists with claim documentation validation and completion
// TODO: Integrate with document analysis AI and completeness checking

// Import additional modules or services here:
// import { DocumentAnalysisService } from '@/services/documentAnalysis'
// import { ClaimValidationAPI } from '@/api/claimValidation'
// import { DocumentTemplateService } from '@/services/documentTemplates'

const Documentation = () => {
  // Add your Documentation Assistant logic here
  // - Document type classification
  // - Completeness validation
  // - Missing document identification
  // - Template generation and guidance
  const [claimType, setClaimType] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, File>>({});
  const [validationResult, setValidationResult] = useState<any>(null);
  const [validating, setValidating] = useState(false);
  const { toast } = useToast();

  const claimTypes = [
    { id: "surgery", name: "Surgery", icon: "🏥" },
    { id: "emergency", name: "Emergency", icon: "🚨" },
    { id: "preventive", name: "Preventive Care", icon: "💊" },
    { id: "specialist", name: "Specialist Visit", icon: "👩‍⚕️" },
    { id: "diagnostic", name: "Diagnostic Tests", icon: "🔬" },
    { id: "mental_health", name: "Mental Health", icon: "🧠" }
  ];

  const getRequiredDocuments = (type: string) => {
    const requirements: Record<string, string[]> = {
      surgery: [
        "Pre-authorization approval",
        "Surgeon's treatment plan",
        "Hospital admission records",
        "Itemized bill",
        "Insurance card copy",
        "Photo ID"
      ],
      emergency: [
        "Emergency room admission records",
        "Physician's notes",
        "Discharge summary",
        "Itemized bill",
        "Insurance card copy",
        "Ambulance records (if applicable)"
      ],
      preventive: [
        "Appointment confirmation",
        "Preventive care checklist",
        "Vaccination records",
        "Insurance card copy",
        "Photo ID"
      ],
      specialist: [
        "Referral from primary care",
        "Specialist consultation notes",
        "Treatment plan",
        "Itemized bill",
        "Insurance card copy"
      ],
      diagnostic: [
        "Test order from physician",
        "Lab/imaging results",
        "Radiologist report",
        "Itemized bill",
        "Insurance card copy"
      ],
      mental_health: [
        "Mental health assessment",
        "Treatment plan",
        "Progress notes",
        "Itemized bill",
        "Insurance card copy"
      ]
    };
    return requirements[type] || [];
  };

  const handleFileUpload = (docType: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedDocs(prev => ({
      ...prev,
      [docType]: file
    }));

    toast({
      title: "File Uploaded",
      description: `${docType} uploaded successfully.`
    });
  };

  const validateDocumentation = async () => {
    if (!claimType) {
      toast({
        title: "Claim Type Required",
        description: "Please select a claim type first.",
        variant: "destructive"
      });
      return;
    }

    setValidating(true);
    
    // Simulate AI validation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const requiredDocs = getRequiredDocuments(claimType);
    const uploadedDocNames = Object.keys(uploadedDocs);
    
    const completeness = (uploadedDocNames.length / requiredDocs.length) * 100;
    
    const mockValidation = {
      completeness: Math.round(completeness),
      missingDocuments: requiredDocs.filter(doc => 
        !uploadedDocNames.some(uploaded => 
          uploaded.toLowerCase().includes(doc.toLowerCase().split(' ')[0])
        )
      ),
      suggestedImprovements: [
        "Ensure all dates are clearly visible",
        "Include complete contact information",
        "Verify all documents are legible",
        "Add detailed itemization for charges"
      ],
      estimatedProcessingTime: Math.floor(Math.random() * 10) + 3 + " business days"
    };

    setValidationResult(mockValidation);
    setValidating(false);

    toast({
      title: "Validation Complete",
      description: `Documentation is ${mockValidation.completeness}% complete.`
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <FileCheck className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-4xl font-bold mb-4 gradient-text">Document Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your claim type, upload required documents, and validate completeness with AI assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Claim Type Selection */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Select Claim Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {claimTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setClaimType(type.id)}
                    className={`p-4 text-left border rounded-lg transition-all hover:scale-105 ${
                      claimType === type.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <span className="font-medium">{type.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Required Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!claimType ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a claim type to see required documents</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getRequiredDocuments(claimType).map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-medium">{doc}</Label>
                        {uploadedDocs[doc] ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      
                      {uploadedDocs[doc] ? (
                        <div className="text-sm text-muted-foreground">
                          ✓ {uploadedDocs[doc].name}
                        </div>
                      ) : (
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(doc, e.target.files[0])}
                          className="text-sm"
                        />
                      )}
                    </div>
                  ))}

                  <Button
                    onClick={validateDocumentation}
                    disabled={validating || Object.keys(uploadedDocs).length === 0}
                    className="w-full mt-6"
                  >
                    {validating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Validating...
                      </>
                    ) : (
                      <>
                        <FileCheck className="mr-2 h-4 w-4" />
                        Validate Documentation
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Validation Results */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Validation Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!validationResult ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Upload documents to see validation results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Completeness Score */}
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {validationResult.completeness}%
                    </div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>

                  {/* Missing Documents */}
                  {validationResult.missingDocuments.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">Missing Documents:</h4>
                      <ul className="space-y-1">
                        {validationResult.missingDocuments.map((doc: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  <div>
                    <h4 className="font-semibold mb-2">Improvement Suggestions:</h4>
                    <ul className="space-y-1">
                      {validationResult.suggestedImprovements.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Processing Time */}
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Estimated Processing Time</div>
                    <div className="text-primary font-semibold">{validationResult.estimatedProcessingTime}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;