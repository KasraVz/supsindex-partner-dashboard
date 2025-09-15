import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Copy, Share2, MoreHorizontal } from 'lucide-react';
import { useAffiliationCodes } from '@/hooks/useAffiliationCodes';
import { TestSelector } from './TestSelector';
import { ShareModal } from './ShareModal';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
export function AffiliationCodesTable() {
  const {
    codes,
    loading,
    toggleCodeStatus,
    createCode
  } = useAffiliationCodes();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCodeData, setNewCodeData] = useState({
    name: '',
    tests: [] as string[],
    discount_percent: 15,
    max_usage: undefined as number | undefined,
    expires_at: ''
  });
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCodeForSharing, setSelectedCodeForSharing] = useState<{
    code: string;
    name: string;
  } | null>(null);
  const { toast } = useToast();
  const handleCreateCode = async () => {
    if (!newCodeData.name.trim() || newCodeData.tests.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please provide a name and select at least one test',
        variant: 'destructive'
      });
      return;
    }
    try {
      await createCode({
        ...newCodeData,
        expires_at: newCodeData.expires_at || undefined
      });
      setShowCreateDialog(false);
      setNewCodeData({
        name: '',
        tests: [],
        discount_percent: 15,
        max_usage: undefined,
        expires_at: ''
      });
    } catch (error) {
      // Error handling is done in the hook
    }
  };
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: `${type} copied to clipboard`
    });
  };
  const getAffiliationLink = (code: string) => {
    return `${window.location.origin}/assessment?code=${code}`;
  };

  const handleShare = (code: string, name: string) => {
    setSelectedCodeForSharing({ code, name });
    setShowShareModal(true);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Affiliation Codes</h2>
          <p className="text-muted-foreground">Create and manage your affiliation codes</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-brand-orange hover:bg-brand-orange/90">
              <Plus className="h-4 w-4 mr-2" />
              Create New Code
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Affiliation Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Code Name</Label>
                <Input id="name" value={newCodeData.name} onChange={e => setNewCodeData(prev => ({
                ...prev,
                name: e.target.value
              }))} placeholder="e.g., University Partnership" />
              </div>
              
              <div>
                
                <TestSelector selectedTests={newCodeData.tests} onSelectionChange={tests => setNewCodeData(prev => ({
                ...prev,
                tests
              }))} />
              </div>

              <div>
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input id="discount" type="number" value={newCodeData.discount_percent} disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
                <p className="text-xs text-muted-foreground mt-1">
                  Discount percentages are determined by the back office
                </p>
              </div>

              <div>
                <Label htmlFor="max_usage">Maximum Uses (Optional)</Label>
                <Input id="max_usage" type="number" min="1" value={newCodeData.max_usage || ''} onChange={e => setNewCodeData(prev => ({
                ...prev,
                max_usage: e.target.value ? parseInt(e.target.value) : undefined
              }))} placeholder="Leave empty for unlimited" />
              </div>

              <div>
                <Label htmlFor="expires_at">Expiration Date (Optional)</Label>
                <Input id="expires_at" type="datetime-local" value={newCodeData.expires_at} onChange={e => setNewCodeData(prev => ({
                ...prev,
                expires_at: e.target.value
              }))} />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateCode} className="flex-1 bg-brand-orange hover:bg-brand-orange/90">
                  Create Code
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Affiliation Codes</CardTitle>
        </CardHeader>
        <CardContent>
          {codes.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              No affiliation codes created yet. Create your first code to get started.
            </div> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map(code => <TableRow key={code.id}>
                    <TableCell className="font-medium">{code.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-dashboard-accent px-2 py-1 rounded text-sm">
                          {code.code}
                        </code>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(code.code, 'Code')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {code.tests.slice(0, 2).map((test, index) => <Badge key={index} variant="secondary" className="text-xs">
                            {test}
                          </Badge>)}
                        {code.tests.length > 2 && <Badge variant="secondary" className="text-xs">
                            +{code.tests.length - 2} more
                          </Badge>}
                      </div>
                    </TableCell>
                    <TableCell>{code.discount_percent}%</TableCell>
                    <TableCell>
                      {code.usage_count}
                      {code.max_usage && ` / ${code.max_usage}`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={code.is_active} onCheckedChange={checked => toggleCodeStatus(code.id, checked)} />
                        <Badge variant={code.is_active ? 'default' : 'secondary'}>
                          {code.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(code.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => copyToClipboard(getAffiliationLink(code.code), 'Link')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleShare(code.code, code.name)}
                        >
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>}
        </CardContent>
      </Card>

      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        affiliationLink={selectedCodeForSharing ? getAffiliationLink(selectedCodeForSharing.code) : ''}
        codeName={selectedCodeForSharing?.name || ''}
      />
    </div>;
}