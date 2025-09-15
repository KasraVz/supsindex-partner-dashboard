import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { AffiliationUsage } from '@/hooks/useAffiliationCodes';
import { format } from 'date-fns';

interface ReportViewerProps {
  isOpen: boolean;
  onClose: () => void;
  usage: AffiliationUsage | null;
}

export function ReportViewer({ isOpen, onClose, usage }: ReportViewerProps) {
  if (!usage) return null;

  const handleDownload = () => {
    // In a real implementation, this would download the actual report file
    console.log('Downloading report for:', usage.user_name);
  };

  const handleExternalView = () => {
    if (usage.report_url) {
      window.open(usage.report_url, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report for {usage.user_name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Report Meta Information */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">User</p>
              <p className="font-medium">{usage.user_name}</p>
              <p className="text-sm text-muted-foreground">{usage.user_email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Code Used</p>
              <p className="font-medium">{usage.code.name}</p>
              <p className="text-sm text-muted-foreground">{usage.code.code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Report Generated</p>
              <p className="font-medium">
                {usage.report_generated_at ? format(new Date(usage.report_generated_at), 'MMM dd, yyyy HH:mm') : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Report Sent</p>
              <p className="font-medium">
                {usage.report_sent_at ? format(new Date(usage.report_sent_at), 'MMM dd, yyyy HH:mm') : 'Not sent'}
              </p>
            </div>
          </div>

          {/* Report Content */}
          <ScrollArea className="h-96 w-full border rounded-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Assessment Report</h3>
              {usage.report_content ? (
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{usage.report_content}</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Report content is not available for preview.</p>
                  {usage.report_url && (
                    <p className="text-sm mt-2">
                      Use the external link button to view the full report.
                    </p>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            {usage.report_url && (
              <Button variant="outline" onClick={handleExternalView}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
            )}
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}