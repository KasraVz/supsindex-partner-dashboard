import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { useAffiliationCodes, useAffiliationUsage } from '@/hooks/useAffiliationCodes';
import { AffiliationCodesTable } from '@/components/affiliation/AffiliationCodesTable';
import { UsageAnalyticsTable } from '@/components/affiliation/UsageAnalyticsTable';

export default function AffiliationsAndEarnings() {
  const { codes, loading: codesLoading } = useAffiliationCodes();
  const { usage, loading: usageLoading } = useAffiliationUsage();
  
  // Calculate metrics from real data
  const [metrics, setMetrics] = useState({
    totalEarnings: 0,
    monthlyEarnings: 0,
    activeCodes: 0,
    successfulConversions: 0,
  });

  useEffect(() => {
    if (!codesLoading && !usageLoading) {
      const currentMonth = new Date();
      const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      
      // Calculate monthly earnings (15% commission from completed assessments)
      const monthlyUsage = usage.filter(u => 
        new Date(u.used_at) >= firstDayOfMonth && 
        u.assessment_status === 'completed'
      );
      
      const monthlyEarnings = monthlyUsage.reduce((total, u) => {
        return total + (u.discount_amount ? (u.discount_amount * 0.15) : 0);
      }, 0);
      
      // Calculate total earnings from all completed assessments
      const totalEarnings = usage
        .filter(u => u.assessment_status === 'completed')
        .reduce((total, u) => {
          return total + (u.discount_amount ? (u.discount_amount * 0.15) : 0);
        }, 0);
      
      const activeCodes = codes.filter(code => code.is_active).length;
      const successfulConversions = usage.filter(u => u.assessment_status === 'completed').length;
      
      setMetrics({
        totalEarnings,
        monthlyEarnings,
        activeCodes,
        successfulConversions,
      });
    }
  }, [codes, usage, codesLoading, usageLoading]);

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
              <div className="text-2xl font-bold">${metrics.totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">15% commission from all conversions</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.monthlyEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From monthly conversions</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
              <Users className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeCodes}</div>
              <p className="text-xs text-muted-foreground">Currently active codes</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <Award className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.successfulConversions}</div>
              <p className="text-xs text-muted-foreground">Completed assessments</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Codes</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="space-y-6">
            <AffiliationCodesTable />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <UsageAnalyticsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}