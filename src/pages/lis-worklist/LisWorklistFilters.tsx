import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { LisSearchParams } from '@/types/lis-search-params';
import type { SpecimenType, LabPriority, LabStatus } from '@/types/specimen';

interface Props {
  searchParams: LisSearchParams;
  onFilterChange: (params: Partial<LisSearchParams>) => void;
  specimenCount: number;
}

export function LisWorklistFilters({ searchParams, onFilterChange, specimenCount }: Props) {
  return (
    <div className="worklist-filter-bar worklist-filter-bar-lis">
      <div className="relative flex-1 min-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search patient name, test, or accession..."
          value={searchParams.search || ''}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="pl-9 h-10 bg-background/70 border-border/70"
        />
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <Select
          value={searchParams.specimenType || 'all'}
          onValueChange={(value) => onFilterChange({ specimenType: value as SpecimenType | 'all' })}
        >
          <SelectTrigger className="w-[160px] h-10 bg-background/70 border-border/70">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Biopsy">Biopsy</SelectItem>
            <SelectItem value="Resection">Resection</SelectItem>
            <SelectItem value="Curettage">Curettage</SelectItem>
            <SelectItem value="Cell Block">Cell Block</SelectItem>
            <SelectItem value="Frozen Section">Frozen Section</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={searchParams.priority || 'all'}
          onValueChange={(value) => onFilterChange({ priority: value as LabPriority | 'all' })}
        >
          <SelectTrigger className="w-[140px] h-10 bg-background/70 border-border/70">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="Routine">Routine</SelectItem>
            <SelectItem value="Urgent">Urgent</SelectItem>
            <SelectItem value="STAT">STAT</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={searchParams.status || 'all'}
          onValueChange={(value) => onFilterChange({ status: value as LabStatus | 'all' })}
        >
          <SelectTrigger className="w-[150px] h-10 bg-background/70 border-border/70">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Received">Received</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Badge variant="secondary" className="px-3 py-1.5 text-xs font-semibold">
          {specimenCount} {specimenCount === 1 ? 'specimen' : 'specimens'}
        </Badge>
      </div>
    </div>
  );
}
