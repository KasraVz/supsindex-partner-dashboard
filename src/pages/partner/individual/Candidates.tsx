import { useState, useMemo } from "react";
import { CandidatesTable } from "@/components/candidates/CandidatesTable";
import { CandidatesFilters } from "@/components/candidates/CandidatesFilters";
import { CandidatesPagination } from "@/components/candidates/CandidatesPagination";
import { AffiliationCodeSelector } from "@/components/affiliation/AffiliationCodeSelector";

// Generate mock data for demonstration
const generateMockCandidates = (count: number) => {
  const names = ["Sarah Johnson", "Mike Chen", "Lisa Wang", "David Smith", "Emma Wilson", "James Brown", "Sophie Taylor", "Alex Garcia", "Maya Patel", "Ryan O'Connor"];
  const companies = ["TechStartup Inc.", "InnovaCorp", "FutureTech Solutions", "DataDrive LLC", "CloudScale Systems", "AI Dynamics", "NextGen Solutions", "ByteForce Tech", "Quantum Labs", "Digital Horizons"];
  const statuses = ["Active", "Pending", "Inactive"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] + (i > 9 ? ` ${Math.floor(i / 10) + 1}` : ""),
    email: `user${i + 1}@${companies[i % companies.length].toLowerCase().replace(/[^a-z]/g, "")}.com`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    company: companies[i % companies.length],
    status: statuses[i % statuses.length],
    joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    lastActivity: i % 4 === 0 ? "2 hours ago" : i % 4 === 1 ? "1 day ago" : i % 4 === 2 ? "3 days ago" : "1 week ago",
    assessments: Math.floor(Math.random() * 8) + 1,
    reports: Math.floor(Math.random() * 5)
  }));
};

const allCandidates = generateMockCandidates(1000);

export default function MyCandidates() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const filteredCandidates = useMemo(() => {
    let filtered = allCandidates;

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(search) ||
        candidate.email.toLowerCase().includes(search) ||
        candidate.company.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(candidate => 
        candidate.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Activity filter
    if (activityFilter !== "all") {
      filtered = filtered.filter(candidate => {
        switch (activityFilter) {
          case "today":
            return candidate.lastActivity.includes("hour");
          case "week":
            return candidate.lastActivity.includes("day") || candidate.lastActivity.includes("hour");
          case "month":
            return !candidate.lastActivity.includes("week");
          case "older":
            return candidate.lastActivity.includes("week");
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, activityFilter]);

  const totalPages = Math.ceil(filteredCandidates.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + pageSize);

  const handleSearchChange = (search: string) => {
    setLoading(true);
    setSearchTerm(search);
    setCurrentPage(1);
    // Simulate API delay
    setTimeout(() => setLoading(false), 300);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleActivityChange = (activity: string) => {
    setActivityFilter(activity);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setActivityFilter("all");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Candidates</h1>
          <p className="text-muted-foreground">
            Manage and track all the candidates you've referred to the platform.
          </p>
        </div>
      </div>

      <AffiliationCodeSelector />

      <CandidatesFilters
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onActivityChange={handleActivityChange}
        onClearFilters={handleClearFilters}
        searchValue={searchTerm}
        statusValue={statusFilter}
        activityValue={activityFilter}
      />

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
        </div>
        
        <CandidatesTable candidates={paginatedCandidates} loading={loading} />
        
        <CandidatesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredCandidates.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}