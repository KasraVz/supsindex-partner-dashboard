import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Target, Calendar, TestTube } from 'lucide-react';
import { AffiliationCodesTable } from '@/components/affiliation/AffiliationCodesTable';
import { UsageAnalyticsTable } from '@/components/affiliation/UsageAnalyticsTable';
import { useAffiliationCodes, useAffiliationUsage } from '@/hooks/useAffiliationCodes';

export default function OrganizationalAffiliations() {
  const { codes } = useAffiliationCodes();
  const { usage } = useAffiliationUsage();
  const [stats, setStats] = useState({
    activeAffiliations: 0,
    totalDiscountProvided: 0,
    monthlyActivity: 0,
    availableTests: 6,
  });

  useEffect(() => {
    // Calculate stats from real data
    const activeCodes = codes.filter(code => code.is_active).length;
    const totalDiscount = usage.reduce((sum, item) => sum + (item.discount_amount || 0), 0);
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const monthlyUsage = usage.filter(item => new Date(item.used_at) >= thisMonth).length;

    setStats({
      activeAffiliations: activeCodes,
      totalDiscountProvided: totalDiscount,
      monthlyActivity: monthlyUsage,
      availableTests: 6, // This could be dynamic based on your test catalog
    });
  }, [codes, usage]);

  return (
    <div className="min-h-screen bg-dashboard-bg p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Affiliation Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage affiliation codes to provide discounts to candidates and track your organizational impact
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
              <Users className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAffiliations}</div>
              <p className="text-xs text-muted-foreground">Currently active codes</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Discount Provided</CardTitle>
              <Target className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalDiscountProvided.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">Saved by candidates</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month's Usage</CardTitle>
              <Calendar className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyActivity}</div>
              <p className="text-xs text-muted-foreground">Code uses this month</p>
            </CardContent>
          </Card>

          <Card className="bg-dashboard-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Tests</CardTitle>
              <TestTube className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableTests}</div>
              <p className="text-xs text-muted-foreground">Ready for affiliation</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabbed Content */}
        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="manage">Manage Codes</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage">
            <AffiliationCodesTable />
          </TabsContent>
          
          <TabsContent value="analytics">
            <UsageAnalyticsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}