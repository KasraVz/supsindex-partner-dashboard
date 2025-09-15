import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, FileText } from 'lucide-react';
import { useAffiliationUsage, AffiliationUsage } from '@/hooks/useAffiliationCodes';
import { ReportViewer } from './ReportViewer';
import { format } from 'date-fns';

export function UsageAnalyticsTable() {
  const { usage, loading } = useAffiliationUsage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reportFilter, setReportFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<AffiliationUsage | null>(null);
  const [showReportViewer, setShowReportViewer] = useState(false);

  const handleViewReport = (usage: AffiliationUsage) => {
    setSelectedReport(usage);
    setShowReportViewer(true);
  };

  const filteredUsage = usage.filter((item) => {
    const matchesSearch = 
      item.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.assessment_status === statusFilter;
    const matchesReport = reportFilter === 'all' || item.report_status === reportFilter;
    
    return matchesSearch && matchesStatus && matchesReport;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'not_started': 'secondary',
      'in_progress': 'outline',
      'completed': 'default',
    } as const;
    
    const labels = {
      'not_started': 'Not Started',
      'in_progress': 'In Progress',
      'completed': 'Completed',
    } as const;

    return (
      <Badge 
        variant={variants[status as keyof typeof variants]} 
        className={status === 'completed' ? 'bg-brand-orange text-white' : ''}
      >
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getReportBadge = (status: string) => {
    const variants = {
      'not_generated': 'secondary',
      'generated': 'outline',
      'sent': 'default',
    } as const;
    
    const labels = {
      'not_generated': 'Not Generated',
      'generated': 'Generated',
      'sent': 'Sent',
    } as const;

    return (
      <Badge 
        variant={variants[status as keyof typeof variants]}
        className={status === 'sent' ? 'bg-brand-orange text-white' : ''}
      >
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  if (loading) {
    return <div>Loading usage analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Usage Analytics</h2>
        <p className="text-muted-foreground">Track how your affiliation codes are being used</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Assessment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={reportFilter} onValueChange={setReportFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Report Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="not_generated">Not Generated</SelectItem>
                <SelectItem value="generated">Generated</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Usage Table */}
      <Card>
        <CardHeader>
          <CardTitle>Code Usage History</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsage.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {usage.length === 0 
                ? "No usage data available yet. Share your affiliation codes to start tracking usage."
                : "No results match your current filters."
              }
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Assessment Status</TableHead>
                  <TableHead>Report Status</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Used Date</TableHead>
                  <TableHead>Completed Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsage.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.user_name}</div>
                        <div className="text-sm text-muted-foreground">{item.user_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-mono text-sm">{item.code.code}</div>
                        <div className="text-sm text-muted-foreground">{item.code.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.assessment_status)}
                    </TableCell>
                    <TableCell>
                      {getReportBadge(item.report_status)}
                    </TableCell>
                    <TableCell>
                      {item.discount_amount ? `$${item.discount_amount}` : '-'}
                    </TableCell>
                    <TableCell>
                      {format(new Date(item.used_at), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      {item.completed_at 
                        ? format(new Date(item.completed_at), 'MMM dd, yyyy HH:mm')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      {(item.report_status === 'generated' || item.report_status === 'sent') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReport(item)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ReportViewer 
        isOpen={showReportViewer}
        onClose={() => setShowReportViewer(false)}
        usage={selectedReport}
      />
    </div>
  );
}