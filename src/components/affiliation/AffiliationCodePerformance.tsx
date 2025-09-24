import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, TrendingUp, BarChart3 } from 'lucide-react';
import { useCodePerformance } from '@/hooks/useAffiliationCodes';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#FF6B35', '#F7931E', '#FFD23F', '#06D6A0', '#118AB2'];

export function AffiliationCodePerformance() {
  const { performance, loading } = useCodePerformance();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPerformance = performance.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Prepare chart data
  const topPerformingCodes = performance
    .filter(code => code.totalUsers > 0)
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5)
    .map(code => ({
      name: code.name,
      conversionRate: code.conversionRate,
    }));

  const usageData = performance
    .filter(code => code.timesUsed > 0)
    .sort((a, b) => b.timesUsed - a.timesUsed)
    .map(code => ({
      name: code.name.length > 15 ? code.name.substring(0, 15) + '...' : code.name,
      usage: code.timesUsed,
    }));

  if (loading) {
    return <div>Loading performance data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Code Performance Analytics</h2>
        <p className="text-muted-foreground">Track the performance and conversion rates of your affiliation codes</p>
      </div>

      {/* BI Charts Section */}
      {(topPerformingCodes.length > 0 || usageData.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doughnut Chart - Top 5 Performing Codes */}
          {topPerformingCodes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-orange" />
                  Top 5 Performing Codes
                </CardTitle>
                <p className="text-sm text-muted-foreground">Based on conversion rate</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topPerformingCodes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="conversionRate"
                      >
                        {topPerformingCodes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bar Chart - Total Usage per Code */}
          {usageData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-brand-orange" />
                  Total Usage per Code
                </CardTitle>
                <p className="text-sm text-muted-foreground">Number of times each code was used</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#FF6B35" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Search Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by code name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Code Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPerformance.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {performance.length === 0 
                ? "No affiliation codes available yet. Create your first code to start tracking performance."
                : "No codes match your search criteria."
              }
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code Name</TableHead>
                  <TableHead>Code ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead>Times Used</TableHead>
                  <TableHead>Conversion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPerformance.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{item.code}</div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.isActive ? 'default' : 'secondary'}
                        className={item.isActive ? 'bg-brand-orange text-white' : ''}
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.expiresAt 
                        ? format(new Date(item.expiresAt), 'MMM dd, yyyy')
                        : 'No expiration'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <span className="text-lg font-semibold">{item.timesUsed}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{item.conversionRate}%</span>
                        {item.totalUsers > 0 && (
                          <span className="text-sm text-muted-foreground">
                            ({item.paidUsers}/{item.totalUsers})
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}