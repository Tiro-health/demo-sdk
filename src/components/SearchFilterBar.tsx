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
import type { Modality, UrgencyLevel } from '@/types/study';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  modalityFilter: Modality | 'all';
  onModalityChange: (value: Modality | 'all') => void;
  urgencyFilter: UrgencyLevel | 'all';
  onUrgencyChange: (value: UrgencyLevel | 'all') => void;
  studyCount: number;
}

export function SearchFilterBar({
  searchTerm,
  onSearchChange,
  modalityFilter,
  onModalityChange,
  urgencyFilter,
  onUrgencyChange,
  studyCount,
}: SearchFilterBarProps) {
  return (
    <div className="worklist-filter-bar worklist-filter-bar-pacs">
      <div className="relative flex-1 min-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search patient name, study, or research question..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 bg-background/70 border-border/70"
        />
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <Select
          value={modalityFilter}
          onValueChange={(value) => onModalityChange(value as Modality | 'all')}
        >
          <SelectTrigger className="w-[180px] h-10 bg-background/70 border-border/70">
            <SelectValue placeholder="All Modalities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modalities</SelectItem>
            <SelectItem value="XA">XA - Angiography</SelectItem>
            <SelectItem value="DX">DX - Digital X-Ray</SelectItem>
            <SelectItem value="PT">PT - PET/CT</SelectItem>
            <SelectItem value="NM">NM - Nuclear Medicine</SelectItem>
            <SelectItem value="MG">MG - Mammogram</SelectItem>
            <SelectItem value="CR">CR - Computed Radiography</SelectItem>
            <SelectItem value="MR">MR - MRI</SelectItem>
            <SelectItem value="CT">CT - CT Scan</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={urgencyFilter}
          onValueChange={(value) => onUrgencyChange(value as UrgencyLevel | 'all')}
        >
          <SelectTrigger className="w-[150px] h-10 bg-background/70 border-border/70">
            <SelectValue placeholder="All Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgency</SelectItem>
            <SelectItem value="Routine">Routine</SelectItem>
            <SelectItem value="Urgent">Urgent</SelectItem>
            <SelectItem value="STAT">STAT</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>

        <Badge variant="secondary" className="px-3 py-1.5 text-xs font-semibold">
          {studyCount} {studyCount === 1 ? 'study' : 'studies'}
        </Badge>
      </div>
    </div>
  );
}
