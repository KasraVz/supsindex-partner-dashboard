import React, { useState } from 'react';
import { Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { usePartner } from '@/contexts/PartnerContext';

interface CodeGeneratorProps {
  selectedTests: string[];
}

export function CodeGenerator({ selectedTests }: CodeGeneratorProps) {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { isOrganizational } = usePartner();

  const generateCode = async () => {
    if (selectedTests.length === 0) {
      toast({
        title: "No tests selected",
        description: "Please select at least one test to generate an affiliation code.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate code generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const prefix = isOrganizational ? 'AFF-ORG' : 'AFF-IND';
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${prefix}-${randomCode}`;
    const link = `https://supsindex.com/assessment?code=${code}&tests=${selectedTests.join(',')}`;
    
    setGeneratedCode(code);
    setGeneratedLink(link);
    setIsGenerating(false);
    
    toast({
      title: "Affiliation code generated!",
      description: "Your code and link are ready to share.",
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied!`,
      description: `${type} has been copied to your clipboard.`,
    });
  };

  const shareLink = () => {
    if (navigator.share && generatedLink) {
      navigator.share({
        title: 'Assessment Opportunity',
        text: `Get ${isOrganizational ? '15%' : '5%'} off your assessment with my affiliation code!`,
        url: generatedLink,
      });
    } else {
      copyToClipboard(generatedLink, 'Link');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Affiliation Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateCode} 
          disabled={isGenerating || selectedTests.length === 0}
          className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Code and Link'
          )}
        </Button>

        {generatedCode && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Affiliation Code</label>
              <div className="flex gap-2">
                <Input value={generatedCode} readOnly className="font-mono" />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(generatedCode, 'Code')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Affiliation Link</label>
              <div className="flex gap-2">
                <Input value={generatedLink} readOnly className="text-xs" />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(generatedLink, 'Link')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={shareLink} 
              variant="secondary" 
              className="w-full"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Share Link
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}