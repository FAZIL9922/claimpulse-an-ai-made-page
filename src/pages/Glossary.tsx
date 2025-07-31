import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, DollarSign, Shield, FileText, Users, Heart, Calculator } from "lucide-react";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Terms", icon: BookOpen },
    { id: "costs", name: "Costs & Payments", icon: DollarSign },
    { id: "coverage", name: "Coverage", icon: Shield },
    { id: "claims", name: "Claims", icon: FileText },
    { id: "providers", name: "Providers", icon: Users },
    { id: "benefits", name: "Benefits", icon: Heart }
  ];

  const glossaryTerms = [
    {
      term: "Deductible",
      category: "costs",
      definition: "The amount you pay for covered health care services before your insurance plan starts to pay.",
      example: "If your deductible is $1,000, you pay the first $1,000 of covered services yourself.",
      relatedTerms: ["Copay", "Coinsurance", "Out-of-pocket maximum"]
    },
    {
      term: "Copay (Copayment)",
      category: "costs",
      definition: "A fixed amount you pay for a covered health care service after you've paid your deductible.",
      example: "Your plan might have a $20 copay for doctor visits and a $10 copay for prescription drugs.",
      relatedTerms: ["Deductible", "Coinsurance"]
    },
    {
      term: "Coinsurance",
      category: "costs",
      definition: "Your share of the costs of a covered health care service, calculated as a percentage.",
      example: "If your coinsurance is 20%, you pay 20% of the cost and insurance pays 80%.",
      relatedTerms: ["Copay", "Deductible", "Out-of-pocket maximum"]
    },
    {
      term: "Out-of-pocket Maximum",
      category: "costs",
      definition: "The most you have to pay for covered services in a plan year. After you reach this amount, insurance pays 100%.",
      example: "If your out-of-pocket max is $6,000, you won't pay more than that for covered services in a year.",
      relatedTerms: ["Deductible", "Copay", "Coinsurance"]
    },
    {
      term: "Premium",
      category: "costs",
      definition: "The amount you pay for your health insurance every month.",
      example: "Your monthly premium might be $300, regardless of whether you use health services.",
      relatedTerms: ["Deductible", "Coverage"]
    },
    {
      term: "Network",
      category: "providers",
      definition: "The facilities, providers and suppliers your health insurer has contracted with to provide health care services.",
      example: "Using in-network providers typically costs less than out-of-network providers.",
      relatedTerms: ["In-network", "Out-of-network", "Provider"]
    },
    {
      term: "In-network",
      category: "providers",
      definition: "Healthcare providers who have a contract with your insurance company to provide services at discounted rates.",
      example: "Visiting an in-network doctor means lower costs for you.",
      relatedTerms: ["Network", "Out-of-network", "Provider"]
    },
    {
      term: "Out-of-network",
      category: "providers",
      definition: "Healthcare providers who don't have a contract with your insurance company.",
      example: "Out-of-network care usually costs more and may not be covered at all.",
      relatedTerms: ["Network", "In-network", "Provider"]
    },
    {
      term: "Primary Care Provider (PCP)",
      category: "providers",
      definition: "A doctor who provides general medical care and coordinates your overall healthcare.",
      example: "Your PCP might be a family doctor, internist, or general practitioner.",
      relatedTerms: ["Specialist", "Referral", "Network"]
    },
    {
      term: "Specialist",
      category: "providers",
      definition: "A doctor who focuses on a specific area of medicine or a particular group of patients.",
      example: "A cardiologist (heart doctor) or dermatologist (skin doctor) are specialists.",
      relatedTerms: ["Primary Care Provider", "Referral"]
    },
    {
      term: "Pre-authorization",
      category: "claims",
      definition: "Approval from your insurance company before you receive certain treatments or services.",
      example: "You might need pre-authorization for an MRI or surgery.",
      relatedTerms: ["Claims", "Coverage", "Benefits"]
    },
    {
      term: "Explanation of Benefits (EOB)",
      category: "claims",
      definition: "A statement from your insurance company explaining what medical treatments were paid for.",
      example: "Your EOB shows what you owe, what insurance paid, and why claims were processed certain ways.",
      relatedTerms: ["Claims", "Benefits", "Coverage"]
    },
    {
      term: "Claim",
      category: "claims",
      definition: "A request for payment that you or your healthcare provider submits to your insurance company.",
      example: "When you visit the doctor, they submit a claim to your insurance for the services provided.",
      relatedTerms: ["EOB", "Benefits", "Coverage"]
    },
    {
      term: "Preventive Care",
      category: "benefits",
      definition: "Healthcare services that help prevent illness or detect problems early when they're easier to treat.",
      example: "Annual check-ups, vaccinations, and cancer screenings are preventive care.",
      relatedTerms: ["Benefits", "Coverage", "Wellness"]
    },
    {
      term: "Essential Health Benefits",
      category: "benefits",
      definition: "A set of healthcare service categories that must be covered by certain plans.",
      example: "These include emergency care, maternity care, mental health services, and prescription drugs.",
      relatedTerms: ["Coverage", "Benefits", "Preventive Care"]
    },
    {
      term: "Formulary",
      category: "coverage",
      definition: "A list of prescription drugs covered by your insurance plan.",
      example: "If your medication is on the formulary, you'll pay less than for non-formulary drugs.",
      relatedTerms: ["Coverage", "Benefits", "Prescription drugs"]
    },
    {
      term: "Grace Period",
      category: "coverage",
      definition: "The period after your premium payment is due during which coverage continues.",
      example: "You might have a 30-day grace period to pay your premium before coverage is terminated.",
      relatedTerms: ["Premium", "Coverage"]
    },
    {
      term: "Waiting Period",
      category: "coverage",
      definition: "The time you must wait before your insurance coverage begins or before certain benefits are available.",
      example: "Some plans have a waiting period for maternity benefits or pre-existing conditions.",
      relatedTerms: ["Coverage", "Benefits", "Pre-existing condition"]
    }
  ];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : BookOpen;
  };

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      costs: "bg-blue-100 text-blue-800 border-blue-200",
      coverage: "bg-green-100 text-green-800 border-green-200",
      claims: "bg-purple-100 text-purple-800 border-purple-200",
      providers: "bg-orange-100 text-orange-800 border-orange-200",
      benefits: "bg-pink-100 text-pink-800 border-pink-200"
    };
    return colors[categoryId] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen pt-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-4xl font-bold mb-4 gradient-text">Insurance Glossary</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understand insurance terms with clear definitions, examples, and interactive explanations.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="feature-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search terms or definitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all hover:scale-105 ${
                        selectedCategory === category.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
            </div>
          </CardContent>
        </Card>

        {/* Glossary Terms */}
        <div className="space-y-6">
          {filteredTerms.map((term, index) => {
            const CategoryIcon = getCategoryIcon(term.category);
            return (
              <Card key={index} className="feature-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CategoryIcon className="h-6 w-6 text-primary" />
                      <span className="text-2xl">{term.term}</span>
                    </div>
                    <Badge className={getCategoryColor(term.category)}>
                      {categories.find(cat => cat.id === term.category)?.name}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Definition */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Definition:
                    </h4>
                    <p className="text-muted-foreground">{term.definition}</p>
                  </div>

                  {/* Example */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Calculator className="h-4 w-4 mr-2" />
                      Example:
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                      <p className="text-muted-foreground italic">{term.example}</p>
                    </div>
                  </div>

                  {/* Related Terms */}
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Related Terms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedTerm, relatedIndex) => (
                          <button
                            key={relatedIndex}
                            onClick={() => setSearchTerm(relatedTerm)}
                            className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm hover:bg-secondary/20 transition-colors"
                          >
                            {relatedTerm}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No results */}
        {filteredTerms.length === 0 && (
          <Card className="feature-card">
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No terms found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or selecting a different category.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Glossary;