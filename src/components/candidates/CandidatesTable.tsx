import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Phone, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  joinDate: string;
  lastActivity: string;
  assessments: number;
  reports: number;
}

interface CandidatesTableProps {
  candidates: Candidate[];
  loading?: boolean;
}

export function CandidatesTable({ candidates, loading }: CandidatesTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  if (loading) {
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div className="h-4 w-32 bg-muted rounded" />
                  </div>
                </TableCell>
                <TableCell className="animate-pulse"><div className="h-4 w-24 bg-muted rounded" /></TableCell>
                <TableCell className="animate-pulse"><div className="h-6 w-16 bg-muted rounded" /></TableCell>
                <TableCell className="animate-pulse"><div className="h-4 w-20 bg-muted rounded" /></TableCell>
                <TableCell className="animate-pulse"><div className="h-4 w-20 bg-muted rounded" /></TableCell>
                <TableCell className="animate-pulse"><div className="h-4 w-16 bg-muted rounded" /></TableCell>
                <TableCell className="animate-pulse"><div className="h-8 w-20 bg-muted rounded" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <Collapsible key={candidate.id} open={expandedRows.has(candidate.id)}>
              <CollapsibleTrigger asChild>
                <TableRow 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleRow(candidate.id)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-xs">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{candidate.name}</span>
                        {expandedRows.has(candidate.id) ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.company}</TableCell>
                  <TableCell>
                    <Badge variant={candidate.status === 'Active' ? 'default' : 'secondary'}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{candidate.joinDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{candidate.lastActivity}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Assessments: {candidate.assessments}</div>
                      <div>Reports: {candidate.reports}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <TableRow className="bg-muted/20">
                  <TableCell colSpan={7}>
                    <div className="py-4 px-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{candidate.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{candidate.phone}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            View Reports
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="mr-2 h-4 w-4" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}