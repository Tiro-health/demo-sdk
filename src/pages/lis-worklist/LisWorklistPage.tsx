import { useSearch, useNavigate } from '@tanstack/react-router';
import { useSpecimens } from '@/hooks/useSpecimens';
import { LisWorklistFilters } from './LisWorklistFilters';
import { LisWorklistTable } from './LisWorklistTable';
import { filterAndSortSpecimens } from './utils';
import type { LisSearchParams } from '@/types/lis-search-params';

export function LisWorklistPage() {
  const specimens = useSpecimens();
  const rawSearchParams = useSearch({ from: '/lis/' });
  const navigate = useNavigate({ from: '/lis/' });

  const searchParams: LisSearchParams = {
    search:
      typeof rawSearchParams.search === 'string' ? rawSearchParams.search : '',
    specimenType:
      typeof rawSearchParams.specimenType === 'string'
        ? rawSearchParams.specimenType
        : 'all',
    priority:
      typeof rawSearchParams.priority === 'string'
        ? rawSearchParams.priority
        : 'all',
    status:
      typeof rawSearchParams.status === 'string'
        ? rawSearchParams.status
        : 'all',
    sortBy:
      rawSearchParams.sortBy === 'collectionDateTime' ||
      rawSearchParams.sortBy === 'patientName' ||
      rawSearchParams.sortBy === 'specimenType' ||
      rawSearchParams.sortBy === 'testOrdered' ||
      rawSearchParams.sortBy === 'status'
        ? rawSearchParams.sortBy
        : 'collectionDateTime',
    sortDir:
      rawSearchParams.sortDir === 'asc' || rawSearchParams.sortDir === 'desc'
        ? rawSearchParams.sortDir
        : 'desc',
  };

  const filteredSpecimens = filterAndSortSpecimens(specimens, searchParams);

  const handleFilterChange = (newParams: Partial<LisSearchParams>) => {
    navigate({ search: (prev) => ({ ...prev, ...newParams }) });
  };

  const handleSpecimenClick = (specimenId: string) => {
    navigate({ to: '/lis/specimen/$specimenId', params: { specimenId } });
  };

  return (
    <div className="worklist-page-shell worklist-page-shell-lis">
      <div className="worklist-content max-w-[1320px] mx-auto p-4 md:p-6 space-y-5">
        <section className="worklist-panel">
          <LisWorklistFilters
            searchParams={searchParams}
            onFilterChange={handleFilterChange}
            specimenCount={filteredSpecimens.length}
          />
        </section>
        <section className="worklist-panel">
          <LisWorklistTable
            specimens={filteredSpecimens}
            searchParams={searchParams}
            onSpecimenClick={handleSpecimenClick}
            onSortChange={handleFilterChange}
          />
        </section>
      </div>
    </div>
  );
}
