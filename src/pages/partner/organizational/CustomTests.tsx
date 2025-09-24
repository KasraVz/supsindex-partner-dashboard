import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, TrendingUp, Calendar, Target, Users, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CustomTestRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    targetAudience: "",
    evaluationAreas: "",
    inputs: "",
    outputs: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Simulate form submission
    toast({
      title: "Request Submitted Successfully",
      description: "Our team will review your brief and reach out to schedule a consultation within 48 hours.",
    });
    
    // Reset form and close modal
    setFormData({
      title: "",
      objective: "",
      targetAudience: "",
      evaluationAreas: "",
      inputs: "",
      outputs: ""
    });
    setIsModalOpen(false);
  };

  const isFormValid = formData.title && formData.objective && formData.targetAudience;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Build Your Competitive Edge with a Custom-Designed Index
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Collaborate with our experts to create a proprietary assessment tailored to your unique investment thesis and talent evaluation criteria.
        </p>
      </div>

      {/* Social Proof / Benefits Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">How Custom DIs Drive Success for Our Partners</h2>
          <p className="text-muted-foreground">
            Discover the measurable impact of custom assessments on investment outcomes
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="text-center">
            <CardHeader className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Increased Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">40%</div>
              <p className="text-sm text-muted-foreground">
                Partners with custom DIs report faster evaluation time for new candidates
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Better Fit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">25%</div>
              <p className="text-sm text-muted-foreground">
                Companies using custom DIs see higher long-term success rate in their portfolio founders
              </p>
            </CardContent>
          </Card>

          <Card className="text-center md:col-span-2 lg:col-span-1">
            <CardHeader className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Precision Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-sm text-muted-foreground">
                Accuracy rate in identifying high-potential candidates through custom assessments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Case Study Section */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <blockquote className="text-lg italic text-center">
              "The custom FinTech risk assessment we built with Supsindex has become the cornerstone of our due diligence process. It's not just an assessment—it's our competitive advantage."
            </blockquote>
            <p className="text-center text-sm text-muted-foreground mt-4">
              — Partner at Leading VC Firm
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Primary CTA */}
      <div className="text-center space-y-4 py-12">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8 py-3 text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Design Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Request a Custom DI Consultation</DialogTitle>
              <DialogDescription>
                Help us understand your needs by completing this detailed brief. This information will make our follow-up consultation incredibly productive.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Assessment Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Advanced FinTech Risk Assessment"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience *</Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Pre-seed FinTech founders, Series A HealthTech CTOs"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">Core Objective *</Label>
                <Textarea
                  id="objective"
                  rows={3}
                  placeholder="What is the primary goal of this assessment? What problem are you trying to solve?"
                  value={formData.objective}
                  onChange={(e) => handleInputChange("objective", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evaluationAreas">Key Evaluation Areas</Label>
                <Textarea
                  id="evaluationAreas"
                  rows={3}
                  placeholder="List the main topics or skills you want to measure (e.g., Regulatory knowledge, API security, financial modeling, go-to-market strategy)"
                  value={formData.evaluationAreas}
                  onChange={(e) => handleInputChange("evaluationAreas", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inputs">Inputs & Procurement Mechanism</Label>
                <Textarea
                  id="inputs"
                  rows={3}
                  placeholder="Describe what information or documents the founder would need to provide to complete the assessment"
                  value={formData.inputs}
                  onChange={(e) => handleInputChange("inputs", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outputs">Desired Outputs</Label>
                <Textarea
                  id="outputs"
                  rows={3}
                  placeholder="Describe what the final report should look like. What key metrics, scores, or recommendations should the report include?"
                  value={formData.outputs}
                  onChange={(e) => handleInputChange("outputs", e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!isFormValid}>
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <p className="text-sm text-muted-foreground">
          No commitment required • Free consultation • Tailored proposal provided
        </p>
      </div>
    </div>
  );
}