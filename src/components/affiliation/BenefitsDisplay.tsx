import React from 'react';
import { usePartner } from '@/contexts/PartnerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Percent, TrendingUp } from 'lucide-react';

export function BenefitsDisplay() {
  const { isOrganizational } = usePartner();

  return (
    <Card className="bg-gradient-card border-dashboard-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-orange" />
          Affiliation Benefits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isOrganizational ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dashboard-accent rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-orange" />
                <span className="font-medium">Candidate Benefits</span>
              </div>
              <Badge variant="secondary" className="bg-brand-orange text-white">
                15% Discount
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Candidates using your affiliation code get 15% off selected assessments.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dashboard-accent rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-orange" />
                <span className="font-medium">Your Earnings</span>
              </div>
              <Badge variant="secondary" className="bg-brand-orange text-white">
                15% Cashback
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-dashboard-accent rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-orange" />
                <span className="font-medium">Candidate Benefits</span>
              </div>
              <Badge variant="outline">
                5% Discount
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              You earn 15% cashback on successful affiliations while candidates get 5% off.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}