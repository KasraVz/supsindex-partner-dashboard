import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Gift, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReferralsAndEarnings() {
  const { toast } = useToast();

  const copyReferralCode = () => {
    navigator.clipboard.writeText("PARTNER-ABC123");
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Referrals & Earnings</h1>
        <p className="text-muted-foreground">
          Track your referral performance and manage your 15% commission earnings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,340</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$420</div>
            <p className="text-xs text-muted-foreground">
              From 8 successful referrals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              Coupons generated
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Referral Code & Links</CardTitle>
            <CardDescription>
              Share your unique referral code to earn 15% commission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Your Referral Code</label>
              <div className="flex items-center space-x-2 mt-1">
                <code className="bg-muted px-3 py-2 rounded-md flex-1 font-mono">
                  PARTNER-ABC123
                </code>
                <Button size="sm" variant="outline" onClick={copyReferralCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Referral Link</label>
              <div className="flex items-center space-x-2 mt-1">
                <code className="bg-muted px-3 py-2 rounded-md flex-1 text-xs">
                  https://supsindex.com/join?ref=PARTNER-ABC123
                </code>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1">
                <ExternalLink className="mr-2 h-4 w-4" />
                Share Link
              </Button>
              <Button variant="outline" className="flex-1">
                <Gift className="mr-2 h-4 w-4" />
                Generate Scholarship
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Breakdown</CardTitle>
            <CardDescription>
              Your earnings by source this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">Direct Referrals</span>
                  <p className="text-xs text-muted-foreground">8 successful conversions</p>
                </div>
                <span className="text-sm font-medium">$320</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">Scholarship Coupons</span>
                  <p className="text-xs text-muted-foreground">5 redeemed this month</p>
                </div>
                <span className="text-sm font-medium">$100</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center font-medium">
                  <span>Total This Month</span>
                  <span className="text-lg">$420</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-md">
              <div className="flex items-center justify-between text-sm">
                <span>Next Payout</span>
                <Badge variant="outline">March 31, 2024</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Payments are processed monthly on the last day
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Referral Activity</CardTitle>
          <CardDescription>
            Track the status of your recent referrals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Completed assessment • TechStartup Inc.</p>
              </div>
              <div className="text-right">
                <Badge variant="default">Earned $45</Badge>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mike Chen</p>
                <p className="text-sm text-muted-foreground">Started program • InnovaCorp</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary">Pending</Badge>
                <p className="text-xs text-muted-foreground mt-1">5 days ago</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Lisa Wang</p>
                <p className="text-sm text-muted-foreground">Premium upgrade • FutureTech Solutions</p>
              </div>
              <div className="text-right">
                <Badge variant="default">Earned $120</Badge>
                <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}