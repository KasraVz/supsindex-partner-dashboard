import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Copy, DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TestSelector } from '@/components/affiliation/TestSelector';
import { BenefitsDisplay } from '@/components/affiliation/BenefitsDisplay';
import { CodeGenerator } from '@/components/affiliation/CodeGenerator';

export default function AffiliationsAndEarnings() {
  const { toast } = useToast();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText("PARTNER2024");
    toast({
      title: "Copied!",
      description: "Affiliation code copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-dashboard-bg p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Affiliations and Earnings</h1>
          <p className="text-muted-foreground mt-2">
            Create affiliation codes, earn 15% cashback, and track your performance
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,245</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$575</div>
              <p className="text-xs text-muted-foreground">From 12 successful affiliations</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Affiliations</CardTitle>
              <Users className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
              <Award className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Coupons distributed</p>
            </CardContent>
          </Card>
        </div>

        {/* Affiliation Code & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <BenefitsDisplay />
            
            <Card className="bg-dashboard-card shadow-card">
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

          <div className="space-y-6">
            <CodeGenerator selectedTests={selectedTests} />
            
            {/* Commission Breakdown */}
            <Card className="bg-dashboard-card shadow-card">
              <CardHeader>
                <CardTitle>Commission Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Affiliation Cashback (15%)</span>
                    <span className="font-medium">$2,450.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Scholarship Bonuses</span>
                    <span className="font-medium">$125.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-medium">
                    <span>Total This Month</span>
                    <span>$2,575.00</span>
                  </div>
                </div>
                
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Payout</span>
                    <span>Dec 1, 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span>Bank Transfer</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Affiliation Activity */}
        <Card className="bg-dashboard-card shadow-card">
          <CardHeader>
            <CardTitle>Recent Affiliation Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Alex Johnson", status: "Completed assessment", earnings: "+$45.00 (15%)", date: "2 hours ago" },
              { name: "Sarah Chen", status: "Started program", earnings: "+$120.00 (15%)", date: "1 day ago" },
              { name: "Mike Rodriguez", status: "Premium upgrade", earnings: "+$200.00 (15%)", date: "2 days ago" },
              { name: "Emma Wilson", status: "Completed assessment", earnings: "+$35.00 (15%)", date: "3 days ago" },
              { name: "David Kim", status: "Started program", earnings: "Pending", date: "4 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-dashboard-accent rounded-lg">
                <div>
                  <div className="font-medium">{activity.name}</div>
                  <div className="text-sm text-muted-foreground">{activity.status}</div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    activity.earnings === "Pending" ? "text-muted-foreground" : "text-brand-orange"
                  }`}>
                    {activity.earnings}
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.date}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}