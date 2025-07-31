import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, AlertCircle, Eye, Download } from "lucide-react";

const UploadPolicy = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(progressInterval);
    setUploadProgress(100);

    // Mock analysis results
    const mockResult = {
      fileName: file.name,
      coverageDetails: [
        {
          clause: "Annual Deductible: $2,500 per individual, $5,000 per family",
          explanation: "You must pay this amount out-of-pocket before insurance coverage begins each year.",
          category: "deductible"
        },
        {
          clause: "Copayment: $30 for primary care visits, $50 for specialists",
          explanation: "Fixed amount you pay for covered services, regardless of the actual cost.",
          category: "copay"
        },
        {
          clause: "Out-of-Network Coverage: 60% after deductible",
          explanation: "If you visit providers outside your insurance network, you pay 40% of the cost.",
          category: "network"
        },
        {
          clause: "Emergency Room: $500 copay, waived if admitted",
          explanation: "You pay $500 for ER visits, but this fee is removed if you're admitted to the hospital.",
          category: "emergency"
        }
      ],
      glossaryTerms: ["deductible", "copay", "network", "emergency"]
    };

    setAnalysisResult(mockResult);
    setUploading(false);

    toast({
      title: "Policy Analyzed Successfully!",
      description: "Your policy has been processed and simplified explanations are ready."
    });
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getGlossaryDefinition = (term: string) => {
    const definitions: Record<string, string> = {
      deductible: "The amount you pay for covered health care services before your insurance plan starts to pay.",
      copay: "A fixed amount you pay for a covered health care service after you've paid your deductible.",
      network: "The facilities, providers and suppliers your health insurer has contracted with to provide health care services.",
      emergency: "A medical condition manifesting itself by acute symptoms of sufficient severity that a prudent layperson could reasonably expect the absence of immediate medical attention to result in serious jeopardy to the individual's health."
    };
    return definitions[term] || "Definition not available";
  };

  return (
    <div className="min-h-screen pt-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Upload className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-4xl font-bold mb-4 gradient-text">Upload Your Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your insurance policy PDF and get simplified explanations with interactive glossary terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Policy Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!file ? (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Upload Your Policy PDF</p>
                  <p className="text-muted-foreground">Click to browse or drag and drop</p>
                  <p className="text-sm text-muted-foreground mt-2">Maximum file size: 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>

                  {uploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="flex-1"
                    >
                      {uploading ? "Processing..." : "Analyze Policy"}
                    </Button>
                    <Button variant="outline" onClick={resetUpload}>
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!analysisResult ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Upload a policy to see simplified explanations</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Policy Coverage Details</h3>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {analysisResult.coverageDetails.map((detail: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="font-medium text-foreground">
                          {detail.clause}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          <strong>Simplified:</strong> {detail.explanation}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {analysisResult.glossaryTerms.filter((term: string) => 
                            detail.clause.toLowerCase().includes(term) || 
                            detail.explanation.toLowerCase().includes(term)
                          ).map((term: string) => (
                            <span
                              key={term}
                              className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full cursor-pointer hover:bg-primary/20 transition-colors"
                              title={getGlossaryDefinition(term)}
                            >
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
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

export default UploadPolicy;