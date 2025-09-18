import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DollarSign, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react";

const mockClaims = [
  {
    id: "CLM-001",
    amount: 450.00,
    status: "pending",
    date: "2024-01-15",
    type: "Affiliation Earnings",
    candidates: 15
  },
  {
    id: "CLM-002", 
    amount: 280.00,
    status: "completed",
    date: "2024-01-10",
    type: "Affiliation Earnings",
    candidates: 8
  },
  {
    id: "CLM-003",
    amount: 650.00,
    status: "processing",
    date: "2024-01-08",
    type: "Affiliation Earnings", 
    candidates: 22
  }
];

const mockPayoutMethods = [
  {
    id: "PM-001",
    type: "Bank Transfer",
    account: "****1234",
    status: "active",
    default: true
  },
  {
    id: "PM-002", 
    type: "PayPal",
    account: "john@example.com",
    status: "active",
    default: false
  }
];

export default function Claims() {
  const totalEarnings = 2450.00;
  const pendingClaims = 450.00;
  const availableBalance = 320.00;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary", 
      pending: "outline"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Money Claims</h1>
        <p className="text-muted-foreground">
          Manage your earnings and payout methods
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From all affiliations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingClaims.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${availableBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Ready to claim
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="claims" className="w-full">
        <TabsList>
          <TabsTrigger value="claims">Claims History</TabsTrigger>
          <TabsTrigger value="methods">Payout Methods</TabsTrigger>
          <TabsTrigger value="new-claim">New Claim</TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims History</CardTitle>
              <CardDescription>
                Track your earning claims and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Candidates</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell>{claim.candidates}</TableCell>
                      <TableCell>${claim.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(claim.status)}
                          {getStatusBadge(claim.status)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout Methods</CardTitle>
              <CardDescription>
                Manage your preferred payout methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPayoutMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{method.type}</p>
                      <p className="text-sm text-muted-foreground">{method.account}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.default && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Separator />
              <Button variant="outline" className="w-full">
                Add New Payout Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-claim" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Claim</CardTitle>
              <CardDescription>
                Claim your available earnings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Available Balance</span>
                  <span className="text-lg font-bold">${availableBalance.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  From recent affiliation earnings
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Payout Method</label>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4" />
                    <span>Bank Transfer - ****1234</span>
                    <Badge variant="secondary" className="ml-auto">Default</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full" disabled={availableBalance <= 0}>
                Claim ${availableBalance.toFixed(2)}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Claims are processed within 3-5 business days
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}