import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Share2, ExternalLink } from 'lucide-react';
import { useAffiliationCodes } from '@/hooks/useAffiliationCodes';
import { ShareModal } from '@/components/affiliation/ShareModal';
import { Link } from 'react-router-dom';

export function AffiliationCodeSelector() {
  const { codes, loading } = useAffiliationCodes();
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const activeCodes = codes.filter(code => code.is_active);
  const selectedCodeData = activeCodes.find(code => code.id === selectedCode);

  const getAffiliationLink = (code: string) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/assessment?code=${code}`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Loading affiliation codes...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeCodes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Affiliation Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              You don't have any active affiliation codes yet.
            </p>
            <Button asChild>
              <Link to="/individual/affiliations">
                <ExternalLink className="mr-2 h-4 w-4" />
                Create Your First Code
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Affiliation Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Code to Share</label>
            <Select value={selectedCode} onValueChange={setSelectedCode}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an affiliation code..." />
              </SelectTrigger>
              <SelectContent>
                {activeCodes.map((code) => (
                  <SelectItem key={code.id} value={code.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{code.name}</span>
                      <div className="flex items-center gap-2 ml-2">
                        <Badge variant="outline" className="text-xs">
                          {code.discount_percent}% off
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {code.tests.length} test{code.tests.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCodeData && (
            <div className="p-3 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Code:</span>
                <Badge variant="outline">{selectedCodeData.code}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tests:</span>
                <span className="text-sm text-muted-foreground">
                  {selectedCodeData.tests.join(', ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Usage:</span>
                <span className="text-sm text-muted-foreground">
                  {selectedCodeData.usage_count}
                  {selectedCodeData.max_usage && ` / ${selectedCodeData.max_usage}`}
                </span>
              </div>
            </div>
          )}

          <Button 
            className="w-full" 
            disabled={!selectedCode}
            onClick={() => setIsShareModalOpen(true)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Selected Code
          </Button>
        </CardContent>
      </Card>

      {selectedCodeData && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          affiliationLink={getAffiliationLink(selectedCodeData.code)}
          codeName={selectedCodeData.name}
        />
      )}
    </>
  );
}