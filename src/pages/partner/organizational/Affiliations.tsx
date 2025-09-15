import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Calendar, TestTube } from 'lucide-react';
import { TestSelector } from '@/components/affiliation/TestSelector';
import { BenefitsDisplay } from '@/components/affiliation/BenefitsDisplay';
import { CodeGenerator } from '@/components/affiliation/CodeGenerator';

export default function OrganizationalAffiliations() {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-dashboard-bg p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Affiliations</h1>
          <p className="text-muted-foreground mt-2">
            Create affiliation codes to provide discounts to candidates and track your organizational impact
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Affiliations</CardTitle>
              <Users className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Discount Provided</CardTitle>
              <Target className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,250</div>
              <p className="text-xs text-muted-foreground">Saved by candidates</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month's Activity</CardTitle>
              <Calendar className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">New affiliations</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Tests</CardTitle>
              <TestTube className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Ready for affiliation</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <BenefitsDisplay />
            
            <Card>
              <CardHeader>
                <CardTitle>Create Affiliation Code</CardTitle>
              </CardHeader>
              <CardContent>
                <TestSelector 
                  selectedTests={selectedTests}
                  onSelectionChange={setSelectedTests}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <CodeGenerator selectedTests={selectedTests} />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Affiliation Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { candidate: "Alex Johnson", test: "Investment Readiness", status: "Completed", discount: "$45" },
                  { candidate: "Sarah Chen", test: "Leadership Analysis", status: "In Progress", discount: "$35" },
                  { candidate: "Mike Rodriguez", test: "Technical Skills", status: "Completed", discount: "$50" },
                  { candidate: "Emma Wilson", test: "Market Validation", status: "Started", discount: "$60" },
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-dashboard-accent rounded-lg">
                    <div>
                      <div className="font-medium">{activity.candidate}</div>
                      <div className="text-sm text-muted-foreground">{activity.test}</div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={activity.status === 'Completed' ? 'default' : 'secondary'}
                        className={activity.status === 'Completed' ? 'bg-brand-orange text-white' : ''}
                      >
                        {activity.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{activity.discount} saved</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}