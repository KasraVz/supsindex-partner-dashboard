import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Award, CheckCircle, AlertCircle, Calendar, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock certificate data
const mockCertificates = [
  {
    id: "CERT-2024-001",
    candidateName: "Sarah Johnson",
    testType: "Entrepreneurship Assessment",
    issueDate: "2024-03-15",
    expiryDate: "2026-03-15",
    status: "valid",
    score: "85/100",
    verificationCode: "VER-ABC123"
  },
  {
    id: "CERT-2024-002", 
    candidateName: "Mike Chen",
    testType: "Leadership Assessment",
    issueDate: "2024-02-20",
    expiryDate: "2026-02-20", 
    status: "valid",
    score: "92/100",
    verificationCode: "VER-XYZ789"
  },
  {
    id: "CERT-2023-157",
    candidateName: "Lisa Wang",
    testType: "Strategic Planning Assessment",
    issueDate: "2023-12-10",
    expiryDate: "2025-12-10",
    status: "valid",
    score: "78/100",
    verificationCode: "VER-DEF456"
  }
];

interface CertificateSearchWidgetProps {
  className?: string;
}

export function CertificateSearchWidget({ className }: CertificateSearchWidgetProps) {
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<typeof mockCertificates[0] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    
    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);
    
    // Simulate API call
    setTimeout(() => {
      const certificate = mockCertificates.find(cert => 
        cert.id.toLowerCase() === searchId.toLowerCase().trim()
      );
      
      if (certificate) {
        setSearchResult(certificate);
      } else {
        setSearchError("Certificate not found. Please check the Certificate ID and try again.");
      }
      
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Valid</Badge>;
      case "expired":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Expired</Badge>;
      case "revoked":
        return <Badge variant="destructive">Revoked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certificate Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter Certificate ID (e.g., CERT-2024-001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching || !searchId.trim()}
          >
            {isSearching ? (
              <>Searching...</>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>

        {searchError && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{searchError}</AlertDescription>
          </Alert>
        )}

        {searchResult && (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Certificate Found</h4>
              </div>
              {getStatusBadge(searchResult.status)}
            </div>
            
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <span className="text-sm text-muted-foreground">Certificate ID</span>
                <p className="font-medium">{searchResult.id}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Verification Code</span>
                <p className="font-medium font-mono text-sm">{searchResult.verificationCode}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Candidate Name</span>
                <p className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {searchResult.candidateName}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Test Type</span>
                <p className="font-medium">{searchResult.testType}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Issue Date</span>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(searchResult.issueDate).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Expiry Date</span>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(searchResult.expiryDate).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Score</span>
                <p className="font-medium">{searchResult.score}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}