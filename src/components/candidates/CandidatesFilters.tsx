import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface CandidatesFiltersProps {
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
  onActivityChange: (activity: string) => void;
  onClearFilters: () => void;
  searchValue: string;
  statusValue: string;
  activityValue: string;
}

export function CandidatesFilters({
  onSearchChange,
  onStatusChange,
  onActivityChange,
  onClearFilters,
  searchValue,
  statusValue,
  activityValue
}: CandidatesFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const hasActiveFilters = searchValue || statusValue !== 'all' || activityValue !== 'all';

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or company..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Status:</label>
          <Select value={statusValue} onValueChange={onStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Activity:</label>
          <Select value={activityValue} onValueChange={onActivityChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="older">Older</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}