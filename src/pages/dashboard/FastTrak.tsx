import { Rocket, Star, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function FastTrak() {
  const fastTrakPrograms = [
    {
      title: "Full Stack Developer",
      description: "Complete web development mastery in 12 weeks",
      duration: "12 weeks",
      price: "$299",
      originalPrice: "$499",
      discount: "40% OFF",
      progress: 0,
      enrolled: false,
      features: ["React & Node.js", "Database Design", "Deployment", "Portfolio Projects"]
    },
    {
      title: "DevOps Engineer",
      description: "Master cloud deployment and CI/CD pipelines",
      duration: "8 weeks",
      price: "$249",
      originalPrice: "$399",
      discount: "38% OFF",
      progress: 65,
      enrolled: true,
      features: ["AWS/Docker", "Kubernetes", "CI/CD", "Monitoring"]
    },
    {
      title: "Data Scientist",
      description: "Python, ML, and data analysis expertise",
      duration: "16 weeks",
      price: "$399",
      originalPrice: "$699",
      discount: "43% OFF",
      progress: 0,
      enrolled: false,
      features: ["Python/R", "Machine Learning", "Statistics", "Data Visualization"]
    }
  ];

  const benefits = [
    "Accelerated learning path",
    "1-on-1 mentorship",
    "Real-world projects",
    "Job placement assistance",
    "Certificate of completion",
    "Lifetime access to materials"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Rocket className="h-8 w-8 text-brand-orange" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
            Fast Trak Programs
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Accelerate your career with our intensive, mentor-guided programs designed for rapid skill development
        </p>
        <Badge className="bg-gradient-to-r from-brand-orange to-brand-orange-light text-white px-4 py-2">
          <Star className="h-4 w-4 mr-1" />
          Limited Time Offer - Up to 43% OFF
        </Badge>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {fastTrakPrograms.map((program, index) => (
          <Card key={index} className={`relative overflow-hidden ${program.enrolled ? 'ring-2 ring-brand-orange' : ''}`}>
            {program.discount && (
              <Badge className="absolute top-3 right-3 bg-red-500 text-white z-10">
                {program.discount}
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {program.title}
                {program.enrolled && <CheckCircle className="h-5 w-5 text-green-500" />}
              </CardTitle>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {program.duration}
              </div>
              
              {program.enrolled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{program.progress}%</span>
                  </div>
                  <Progress value={program.progress} className="h-2" />
                </div>
              )}
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">What you'll learn:</h4>
                <ul className="space-y-1">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-brand-orange">{program.price}</span>
                    {program.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {program.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  className={`w-full ${program.enrolled 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gradient-to-r from-brand-orange to-brand-orange-light hover:from-brand-orange-dark hover:to-brand-orange'
                  }`}
                >
                  {program.enrolled ? (
                    <>Continue Learning <ArrowRight className="h-4 w-4 ml-2" /></>
                  ) : (
                    <>Enroll Now <ArrowRight className="h-4 w-4 ml-2" /></>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Why Choose Fast Trak?</CardTitle>
          <CardDescription>
            Our intensive programs are designed to get you job-ready in the shortest time possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-brand-orange/10 to-brand-orange-light/10 border-brand-orange/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-2">Ready to Fast Trak Your Career?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of successful graduates who accelerated their careers with our programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-brand-orange to-brand-orange-light hover:from-brand-orange-dark hover:to-brand-orange">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}