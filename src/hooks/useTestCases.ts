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
            name: "Complex Cardiology Visit",
            description: "Multi-service cardiology consultation with diagnostics",
            expectedResult: "EOB with cardiology services and varied persona views",
            mockData: {
              patientName: "Margaret Johnson",
              claimNumber: "CLM-2024-002345",
              serviceDate: "2024-02-20",
              provider: "Central Heart Institute",
              services: [
                {
                  description: "Cardiology Consultation - Level 5",
                  code: "99215",
                  charges: 450.00,
                  allowedAmount: 380.00,
                  deductible: 100.00,
                  copay: 50.00,
                  coinsurance: 46.00,
                  paidByInsurance: 184.00,
                  patientResponsibility: 196.00
                },
                {
                  description: "Echocardiogram",
                  code: "93306",
                  charges: 850.00,
                  allowedAmount: 720.00,
                  deductible: 0.00,
                  copay: 0.00,
                  coinsurance: 144.00,
                  paidByInsurance: 576.00,
                  patientResponsibility: 144.00
                },
                {
                  description: "Stress Test",
                  code: "93017",
                  charges: 600.00,
                  allowedAmount: 480.00,
                  deductible: 0.00,
                  copay: 0.00,
                  coinsurance: 96.00,
                  paidByInsurance: 384.00,
                  patientResponsibility: 96.00
                }
              ],
              totals: {
                totalCharges: 1900.00,
                totalAllowed: 1580.00,
                totalDeductible: 100.00,
                totalCopay: 50.00,
                totalCoinsurance: 286.00,
                totalPaidByInsurance: 1144.00,
                totalPatientResponsibility: 436.00
              }
            }
          },
          {
            id: 2,
            name: "Pediatric Emergency Room",
            description: "Child's emergency room visit with family coverage",
            expectedResult: "Emergency EOB with family-friendly interface options",
            mockData: {
              patientName: "Emma Rodriguez (Age 8)",
              claimNumber: "CLM-2024-003456",
              serviceDate: "2024-03-15",
              provider: "Children's Emergency Center",
              services: [
                {
                  description: "ER Visit - High Complexity",
                  code: "99285",
                  charges: 1200.00,
                  allowedAmount: 950.00,
                  deductible: 0.00,
                  copay: 150.00,
                  coinsurance: 0.00,
                  paidByInsurance: 800.00,
                  patientResponsibility: 150.00
                },
                {
                  description: "X-Ray - Arm (2 views)",
                  code: "73060",
                  charges: 350.00,
                  allowedAmount: 280.00,
                  deductible: 0.00,
                  copay: 0.00,
                  coinsurance: 56.00,
                  paidByInsurance: 224.00,
                  patientResponsibility: 56.00
                }
              ],
              totals: {
                totalCharges: 1550.00,
                totalAllowed: 1230.00,
                totalDeductible: 0.00,
                totalCopay: 150.00,
                totalCoinsurance: 56.00,
                totalPaidByInsurance: 1024.00,
                totalPatientResponsibility: 206.00
              }
            }
          },
          {
            id: 3,
            name: "Annual Executive Physical",
            description: "Comprehensive executive health assessment with analytics",
            expectedResult: "Executive physical EOB with professional analytics view",
            mockData: {
              patientName: "Dr. Robert Chen",
              claimNumber: "CLM-2024-004567",
              serviceDate: "2024-04-10",
              provider: "Executive Health Partners",
              services: [
                {
                  description: "Comprehensive Physical Exam",
                  code: "99396",
                  charges: 750.00,
                  allowedAmount: 600.00,
                  deductible: 0.00,
                  copay: 0.00,
                  coinsurance: 120.00,
                  paidByInsurance: 480.00,
                  patientResponsibility: 120.00
                },
                {
                  description: "Complete Metabolic Panel",
                  code: "80053",
                  charges: 200.00,
                  allowedAmount: 160.00,
                  deductible: 0.00,
                  copay: 0.00,
                  coinsurance: 32.00,
                  paidByInsurance: 128.00,
                  patientResponsibility: 32.00
                },
                {
                  description: "Lipid Panel",
                  code: "80061",
                  charges: 150.00,
                  allowedAmount: 120.00,
                  deductible: 0.00,
                  copay: 0.00,
                  coinsurance: 24.00,
                  paidByInsurance: 96.00,
                  patientResponsibility: 24.00
                },
                {
                  description: "EKG Interpretation",
                  code: "93000",
                  charges: 100.00,
                  allowedAmount: 80.00,
                  deductible: 0.00,
                  copay: 0.00,
                  coinsurance: 16.00,
                  paidByInsurance: 64.00,
                  patientResponsibility: 16.00
                }
              ],
              totals: {
                totalCharges: 1200.00,
                totalAllowed: 960.00,
                totalDeductible: 0.00,
                totalCopay: 0.00,
                totalCoinsurance: 192.00,
                totalPaidByInsurance: 768.00,
                totalPatientResponsibility: 192.00
              }
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