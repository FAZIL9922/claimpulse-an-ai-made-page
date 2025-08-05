import { useState, useCallback } from "react";

export interface TestCase {
  id: number;
  name: string;
  description: string;
  expectedResult: string;
  mockData: any;
}

export const useTestCases = (pageType: string) => {
  const [currentTestCase, setCurrentTestCase] = useState(0);
  
  const getTestCases = useCallback((): TestCase[] => {
    switch (pageType) {
      case 'upload-policy':
        return [
          {
            id: 1,
            name: "Basic Health Insurance Policy",
            description: "Standard individual health insurance policy with typical coverage",
            expectedResult: "Policy analyzed with deductible, copay, and coverage details",
            mockData: {
              fileName: "HealthPolicy_Basic.pdf",
              coverageDetails: [
                {
                  clause: "Annual Deductible: $1,500 per individual",
                  explanation: "You pay $1,500 before insurance starts covering costs.",
                  category: "deductible"
                },
                {
                  clause: "Primary Care Copay: $25",
                  explanation: "Fixed $25 fee for each primary care visit.",
                  category: "copay"
                }
              ]
            }
          },
          {
            id: 2,
            name: "Family Health Insurance Policy", 
            description: "Comprehensive family policy with multiple dependents",
            expectedResult: "Family policy with dependent coverage and family deductible",
            mockData: {
              fileName: "HealthPolicy_Family.pdf",
              coverageDetails: [
                {
                  clause: "Family Deductible: $3,000 per year",
                  explanation: "Combined family deductible before coverage begins.",
                  category: "deductible"
                },
                {
                  clause: "Dependent Coverage: Children up to 26",
                  explanation: "Coverage extends to children until age 26.",
                  category: "dependents"
                }
              ]
            }
          },
          {
            id: 3,
            name: "High-Deductible Health Plan",
            description: "HDHP with Health Savings Account eligibility",
            expectedResult: "High-deductible plan with HSA benefits highlighted",
            mockData: {
              fileName: "HealthPolicy_HDHP.pdf",
              coverageDetails: [
                {
                  clause: "High Deductible: $5,000 individual",
                  explanation: "Higher deductible but HSA eligible for tax savings.",
                  category: "deductible"
                },
                {
                  clause: "HSA Contribution Limit: $3,650",
                  explanation: "Maximum tax-deductible HSA contribution allowed.",
                  category: "hsa"
                }
              ]
            }
          }
        ];

      case 'treatment-checker':
        return [
          {
            id: 1,
            name: "Physical Therapy Treatment",
            description: "Standard physical therapy coverage check",
            expectedResult: "High coverage with prior authorization required",
            mockData: {
              treatment: "Physical Therapy",
              covered: true,
              coveragePercentage: 85,
              estimatedCost: 1200,
              copay: 40,
              requirements: ["Prior authorization required", "Referral from physician"]
            }
          },
          {
            id: 2,
            name: "MRI Scan Diagnostic",
            description: "Advanced imaging coverage verification", 
            expectedResult: "Covered with pre-approval and high cost sharing",
            mockData: {
              treatment: "MRI Scan",
              covered: true,
              coveragePercentage: 70,
              estimatedCost: 2800,
              copay: 100,
              requirements: ["Pre-authorization mandatory", "Medical necessity review"]
            }
          },
          {
            id: 3,
            name: "Specialist Consultation",
            description: "Cardiology specialist visit coverage",
            expectedResult: "Excellent coverage with standard copay",
            mockData: {
              treatment: "Cardiology Consultation",
              covered: true,
              coveragePercentage: 90,
              estimatedCost: 450,
              copay: 50,
              requirements: ["Referral from primary care"]
            }
          }
        ];

      case 'documentation':
        return [
          {
            id: 1,
            name: "Surgery Documentation",
            description: "Complete surgical claim documentation",
            expectedResult: "High completeness with all required documents",
            mockData: {
              claimType: "surgery",
              completeness: 95,
              missingDocuments: ["Photo ID"],
              suggestedImprovements: ["Ensure all signatures are visible"],
              estimatedProcessingTime: "5 business days"
            }
          },
          {
            id: 2,
            name: "Emergency Care Documentation",
            description: "Emergency room visit claim validation",
            expectedResult: "Moderate completeness with missing ambulance records",
            mockData: {
              claimType: "emergency", 
              completeness: 75,
              missingDocuments: ["Ambulance records", "Discharge summary"],
              suggestedImprovements: ["Include complete timeline", "Add emergency contact info"],
              estimatedProcessingTime: "7 business days"
            }
          },
          {
            id: 3,
            name: "Preventive Care Documentation",
            description: "Annual checkup and vaccination records",
            expectedResult: "Complete documentation with fast processing",
            mockData: {
              claimType: "preventive",
              completeness: 100,
              missingDocuments: [],
              suggestedImprovements: ["Documentation is complete"],
              estimatedProcessingTime: "2 business days"
            }
          }
        ];

      case 'claim-predictor':
        return [
          {
            id: 1,
            name: "Routine Surgery Claim",
            description: "Standard surgical procedure claim prediction",
            expectedResult: "High approval likelihood with minor documentation needs",
            mockData: {
              approvalLikelihood: 92,
              confidenceScore: 88,
              riskFactors: [
                { factor: "Missing pre-authorization", severity: "medium", impact: "May delay processing" }
              ],
              suggestions: [
                { category: "documentation", priority: "high", action: "Submit pre-authorization form" }
              ]
            }
          },
          {
            id: 2,
            name: "Complex Emergency Claim",
            description: "Multi-day emergency hospitalization claim",
            expectedResult: "Moderate approval likelihood requiring additional review",
            mockData: {
              approvalLikelihood: 78,
              confidenceScore: 82,
              riskFactors: [
                { factor: "High cost threshold", severity: "high", impact: "Requires additional review" },
                { factor: "Out-of-network provider", severity: "medium", impact: "Reduced coverage" }
              ],
              suggestions: [
                { category: "appeal", priority: "medium", action: "Prepare medical necessity documentation" }
              ]
            }
          },
          {
            id: 3,
            name: "Preventive Care Claim",
            description: "Annual wellness visit and screening claim",
            expectedResult: "Excellent approval likelihood with full coverage",
            mockData: {
              approvalLikelihood: 98,
              confidenceScore: 95,
              riskFactors: [],
              suggestions: [
                { category: "optimization", priority: "low", action: "Submit within 30 days for faster processing" }
              ]
            }
          }
        ];

      case 'persona-eob':
        return [
          {
            id: 1,
            name: "Senior-Friendly EOB",
            description: "Large fonts and simple language for senior users",
            expectedResult: "Clear, large text with audio narration options",
            mockData: {
              targetPersona: "senior",
              features: ["Large fonts", "High contrast", "Voice narration", "Simple language"],
              adaptations: ["Increased text size to 18px", "Added voice controls", "Simplified terminology"]
            }
          },
          {
            id: 2,
            name: "Professional EOB Analysis",
            description: "Detailed tabular data for healthcare professionals",
            expectedResult: "Comprehensive tables with detailed breakdowns",
            mockData: {
              targetPersona: "professional",
              features: ["Detailed tables", "Medical codes", "Cost breakdowns", "Analytics"],
              adaptations: ["Added CPT codes", "Detailed cost analysis", "Professional terminology"]
            }
          },
          {
            id: 3,
            name: "Family-Friendly EOB",
            description: "Visual and emoji-rich interface for families",
            expectedResult: "Colorful interface with emojis and summaries",
            mockData: {
              targetPersona: "family",
              features: ["Emojis", "Color coding", "Simple summaries", "Visual icons"],
              adaptations: ["Added emoji indicators", "Color-coded sections", "Family-friendly language"]
            }
          }
        ];

      default:
        return [];
    }
  }, [pageType]);

  const testCases = getTestCases();
  
  const nextTestCase = useCallback(() => {
    setCurrentTestCase((prev) => (prev + 1) % testCases.length);
    return testCases[(currentTestCase + 1) % testCases.length];
  }, [testCases, currentTestCase]);

  const getCurrentTestCase = useCallback(() => {
    return testCases[currentTestCase];
  }, [testCases, currentTestCase]);

  const resetTestCases = useCallback(() => {
    setCurrentTestCase(0);
  }, []);

  return {
    testCases,
    currentTestCase: getCurrentTestCase(),
    nextTestCase,
    resetTestCases,
    currentIndex: currentTestCase
  };
};