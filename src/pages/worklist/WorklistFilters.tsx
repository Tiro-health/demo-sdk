import { SearchFilterBar } from '@/components/SearchFilterBar';
import { WorklistSearchParams } from '@/types/search-params';
import { Modality, UrgencyLevel } from '@/types/study';

interface Props {
  searchParams: WorklistSearchParams;
  onFilterChange: (params: Partial<WorklistSearchParams>) => void;
  studyCount: number;
}

export function WorklistFilters({ searchParams, onFilterChange, studyCount }: Props) {
  return (
    <SearchFilterBar
      searchTerm={searchParams.search || ''}
      onSearchChange={(search) => onFilterChange({ search })}
      modalityFilter={(searchParams.modality as Modality | 'all') || 'all'}
      onModalityChange={(modality) => onFilterChange({ modality })}
      urgencyFilter={(searchParams.urgency as UrgencyLevel | 'all') || 'all'}
      onUrgencyChange={(urgency) => onFilterChange({ urgency })}
      studyCount={studyCount}
    />
  );
}
