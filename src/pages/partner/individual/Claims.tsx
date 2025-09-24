import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/claims/DateRangePicker";
import { useToast } from "@/hooks/use-toast";
import { exportToCSV, exportToPDF } from "@/lib/export-utils";
import { DollarSign, CreditCard, Clock, CheckCircle, Download, Filter, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
const mockClaims = [{
  id: "CLM-001",
  amount: 450.00,
  status: "processing",
  date: "2024-01-15",
  type: "Affiliation Earnings",
  candidates: 15
}, {
  id: "CLM-002",
  amount: 280.00,
  status: "completed",
  date: "2024-01-10",
  type: "Affiliation Earnings",
  candidates: 8
}, {
  id: "CLM-003",
  amount: 650.00,
  status: "processing",
  date: "2024-01-08",
  type: "Affiliation Earnings",
  candidates: 22
}, {
  id: "CLM-004",
  amount: 120.00,
  status: "completed",
  date: "2024-01-05",
  type: "Affiliation Earnings",
  candidates: 4
}];

const mockTransactions = [
  {
    id: "TXN-001",
    date: "2024-01-20",
    type: "Affiliation Commission",
    amount: 45.00,
    status: "Available",
    affiliationCode: "TECH2024"
  },
  {
    id: "TXN-002", 
    date: "2024-01-19",
    type: "Affiliation Commission",
    amount: 35.00,
    status: "Available",
    affiliationCode: "STARTUP2024"
  },
  {
    id: "TXN-003",
    date: "2024-01-18", 
    type: "Scholarship Bonus",
    amount: 100.00,
    status: "Available",
    affiliationCode: null
  },
  {
    id: "TXN-004",
    date: "2024-01-15",
    type: "Affiliation Commission",
    amount: 25.00,
    status: "Claimed",
    affiliationCode: "TECH2024"
  },
  {
    id: "TXN-005",
    date: "2024-01-12",
    type: "Affiliation Commission", 
    amount: 65.00,
    status: "Claimed",
    affiliationCode: "BUSINESS2024"
  },
  {
    id: "TXN-006",
    date: "2024-01-10",
    type: "Scholarship Bonus",
    amount: 75.00,
    status: "Available",
    affiliationCode: null
  }
];
const mockPayoutMethods = [{
  id: "PM-001",
  type: "Bank Transfer",
  account: "****1234",
  status: "active",
  default: true
}, {
  id: "PM-002",
  type: "PayPal",
  account: "john@example.com",
  status: "active",
  default: false
}];
export default function Claims() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [transactionStatusFilter, setTransactionStatusFilter] = useState<string>("all");
  const [transactionSortBy, setTransactionSortBy] = useState<string>("date");
  const [transactionSortOrder, setTransactionSortOrder] = useState<"asc" | "desc">("desc");
  const [claimAmount, setClaimAmount] = useState<string>("");
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState<string>("PM-001");

  const totalEarnings = 2450.00;
  const processingClaims = 1100.00; // Updated from pendingClaims
  const availableBalance = 320.00;
  // Filtered and sorted claims
  const filteredClaims = useMemo(() => {
    let filtered = mockClaims.filter(claim => {
      const dateMatch = !dateRange?.from || 
        (new Date(claim.date) >= dateRange.from && 
         (!dateRange.to || new Date(claim.date) <= dateRange.to));
      const statusMatch = statusFilter === "all" || claim.status === statusFilter;
      return dateMatch && statusMatch;
    });

    return filtered.sort((a, b) => {
      const aValue = sortBy === "date" ? new Date(a.date).getTime() : a.amount;
      const bValue = sortBy === "date" ? new Date(b.date).getTime() : b.amount;
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [dateRange, statusFilter, sortBy, sortOrder]);

  // Filtered and sorted transactions
  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions.filter(transaction => {
      const dateMatch = !dateRange?.from || 
        (new Date(transaction.date) >= dateRange.from && 
         (!dateRange.to || new Date(transaction.date) <= dateRange.to));
      const statusMatch = transactionStatusFilter === "all" || transaction.status === transactionStatusFilter;
      return dateMatch && statusMatch;
    });

    return filtered.sort((a, b) => {
      const aValue = transactionSortBy === "date" ? new Date(a.date).getTime() : a.amount;
      const bValue = transactionSortBy === "date" ? new Date(b.date).getTime() : b.amount;
      
      if (transactionSortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [dateRange, transactionStatusFilter, transactionSortBy, transactionSortOrder]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>;
  };

  const handleExportClaims = (format: "csv" | "pdf") => {
    const exportData = filteredClaims.map(claim => ({
      "Date": claim.date,
      "Amount": `$${claim.amount.toFixed(2)}`,
      "Status": claim.status
    }));

    if (format === "csv") {
      exportToCSV(exportData, "claims-history");
    } else {
      exportToPDF(exportData, "claims-history", "Claims History Report");
    }

    toast({
      title: "Export successful",
      description: `Claims history exported as ${format.toUpperCase()}`,
    });
  };

  const handleExportTransactions = (format: "csv" | "pdf") => {
    const exportData = filteredTransactions.map(transaction => ({
      "Date": transaction.date,
      "Type": transaction.type,
      "Affiliation Code": transaction.affiliationCode || "N/A",
      "Amount": `$${transaction.amount.toFixed(2)}`,
      "Status": transaction.status
    }));

    if (format === "csv") {
      exportToCSV(exportData, "earning-history");
    } else {
      exportToPDF(exportData, "earning-history", "Earning History Report");
    }

    toast({
      title: "Export successful", 
      description: `Earning history exported as ${format.toUpperCase()}`,
    });
  };

  const handleClaimSubmit = () => {
    const amount = parseFloat(claimAmount);
    if (!claimAmount || amount <= 0 || amount > availableBalance) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount within your available balance.",
        variant: "destructive",
      });
      return;
    }

    const selectedMethod = mockPayoutMethods.find(m => m.id === selectedPayoutMethod);
    
    toast({
      title: "Claim submitted successfully!",
      description: `$${amount.toFixed(2)} will be transferred to your ${selectedMethod?.type} account.`,
    });
    
    setClaimAmount("");
  };
  return <div className="container mx-auto p-6 space-y-6">
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
            <CardTitle className="text-sm font-medium">Processing Claims</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${processingClaims.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Currently being processed
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
          <TabsTrigger value="transactions">Earning History</TabsTrigger>
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
            <CardContent className="space-y-4">
              {/* Filters and Controls */}
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                    const [field, order] = value.split('-');
                    setSortBy(field);
                    setSortOrder(order as "asc" | "desc");
                  }}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Date (Newest)</SelectItem>
                      <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                      <SelectItem value="amount-desc">Amount (High-Low)</SelectItem>
                      <SelectItem value="amount-asc">Amount (Low-High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExportClaims("csv")}>
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExportClaims("pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map(claim => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.date}</TableCell>
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

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earning History</CardTitle>
              <CardDescription>
                Detailed breakdown of all earnings that contribute to your balance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters and Controls */}
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
                  <Select value={transactionStatusFilter} onValueChange={setTransactionStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Claimed">Claimed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={`${transactionSortBy}-${transactionSortOrder}`} onValueChange={(value) => {
                    const [field, order] = value.split('-');
                    setTransactionSortBy(field);
                    setTransactionSortOrder(order as "asc" | "desc");
                  }}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Date (Newest)</SelectItem>
                      <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                      <SelectItem value="amount-desc">Amount (High-Low)</SelectItem>
                      <SelectItem value="amount-asc">Amount (Low-High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExportTransactions("csv")}>
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExportTransactions("pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Affiliation Code</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map(transaction => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        {transaction.affiliationCode ? (
                          <Badge variant="outline">{transaction.affiliationCode}</Badge>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "Available" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
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
              {mockPayoutMethods.map(method => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{method.type}</p>
                      <p className="text-sm text-muted-foreground">{method.account}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.default && <Badge variant="secondary">Default</Badge>}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Edit payout method",
                          description: "Payout method editing functionality would be implemented here.",
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Separator />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Add payout method",
                    description: "New payout method setup would be implemented here.",
                  });
                }}
              >
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
                <label className="text-sm font-medium">Claim Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="pl-8"
                    max={availableBalance}
                    min="0"
                    step="0.01"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum: ${availableBalance.toFixed(2)}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Payout Method</label>
                <Select value={selectedPayoutMethod} onValueChange={setSelectedPayoutMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payout method" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPayoutMethods.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>{method.type} - {method.account}</span>
                          {method.default && <Badge variant="secondary">Default</Badge>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full" 
                disabled={!claimAmount || parseFloat(claimAmount) <= 0 || parseFloat(claimAmount) > availableBalance}
                onClick={handleClaimSubmit}
              >
                {claimAmount && parseFloat(claimAmount) > 0 
                  ? `Claim $${parseFloat(claimAmount).toFixed(2)}`
                  : "Enter amount to claim"
                }
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Claims are processed within 3-5 business days
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}