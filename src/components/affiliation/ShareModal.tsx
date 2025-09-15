import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Share2, 
  Copy, 
  Mail, 
  MessageSquare,
  QrCode,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliationLink: string;
  codeName: string;
}

export function ShareModal({ isOpen, onClose, affiliationLink, codeName }: ShareModalProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Link copied to clipboard',
    });
  };

  const shareViaEmail = () => {
    const subject = `Assessment Opportunity - ${codeName}`;
    const body = `Hi there!\n\nI'd like to invite you to take advantage of a special assessment opportunity through my affiliation code.\n\nUse this link to get started:\n${affiliationLink}\n\nBest regards!`;
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  const shareOnSocial = (platform: string) => {
    const text = `Check out this assessment opportunity: ${affiliationLink}`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliationLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(affiliationLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const generateQR = () => {
    // In a real implementation, you might use a QR code library
    // For now, we'll use a simple QR code service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(affiliationLink)}`;
    window.open(qrUrl, '_blank');
  };

  const useWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Assessment Opportunity - ${codeName}`,
          text: 'Check out this assessment opportunity',
          url: affiliationLink,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Affiliation Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Link Display and Copy */}
          <div className="space-y-2">
            <Label htmlFor="link">Affiliation Link</Label>
            <div className="flex gap-2">
              <Input
                id="link"
                value={affiliationLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(affiliationLink)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={shareViaEmail} className="justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" onClick={generateQR} className="justify-start">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              {navigator.share && (
                <Button variant="outline" onClick={useWebShare} className="justify-start col-span-2">
                  <Share2 className="h-4 w-4 mr-2" />
                  Native Share
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Social Media */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Social Media</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => shareOnSocial('facebook')}
                className="justify-start"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocial('twitter')}
                className="justify-start"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocial('linkedin')}
                className="justify-start"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocial('whatsapp')}
                className="justify-start"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}