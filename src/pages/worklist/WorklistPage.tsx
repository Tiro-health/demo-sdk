import { useSearch, useNavigate } from '@tanstack/react-router';
import { useStudies } from '@/hooks/useStudies';
import { TwoColumnLayout } from '@/components/layouts/TwoColumnLayout';
import { SDKPanel } from '@/components/shared/SDKPanel';
import { WorklistFilters } from './WorklistFilters';
import { WorklistTable } from './WorklistTable';
import { filterAndSortStudies } from './utils';

export function WorklistPage() {
  const studies = useStudies();
  const rawSearchParams = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });

  // Provide defaults for search params
  const searchParams = {
    search: typeof rawSearchParams.search === 'string' ? rawSearchParams.search : '',
    modality: typeof rawSearchParams.modality === 'string' ? rawSearchParams.modality : 'all',
    urgency: typeof rawSearchParams.urgency === 'string' ? rawSearchParams.urgency : 'all',
    sortBy: (rawSearchParams.sortBy === 'dateTime' || rawSearchParams.sortBy === 'patientName' || rawSearchParams.sortBy === 'modality')
      ? rawSearchParams.sortBy
      : 'dateTime',
    sortDir: (rawSearchParams.sortDir === 'asc' || rawSearchParams.sortDir === 'desc')
      ? rawSearchParams.sortDir
      : 'desc',
  } as const;

  const filteredStudies = filterAndSortStudies(studies, searchParams);

  const handleFilterChange = (newParams: Partial<typeof searchParams>) => {
    navigate({ search: (prev) => ({ ...prev, ...newParams }) });
  };

  const handleStudyClick = (studyId: string) => {
    navigate({ to: '/study/$studyId', params: { studyId } });
  };

  return (
    <TwoColumnLayout sidebar={<SDKPanel />}>
      <div className="space-y-4">
        <WorklistFilters
          searchParams={searchParams}
          onFilterChange={handleFilterChange}
          studyCount={filteredStudies.length}
        />
        <WorklistTable
          studies={filteredStudies}
          searchParams={searchParams}
          onStudyClick={handleStudyClick}
          onSortChange={handleFilterChange}
        />
      </div>
    </TwoColumnLayout>
  );
}
