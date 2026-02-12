import { createFileRoute } from '@tanstack/react-router';
import { LisWorklistPage } from '@/pages/lis-worklist/LisWorklistPage';
import type { LisSearchParams } from '@/types/lis-search-params';

export const Route = createFileRoute('/lis/')({
  component: LisWorklistPage,
  validateSearch: (search: Record<string, unknown>): LisSearchParams => ({
    search: typeof search.search === 'string' ? search.search : undefined,
    specimenType: typeof search.specimenType === 'string'
      ? search.specimenType as LisSearchParams['specimenType']
      : 'all',
    priority: typeof search.priority === 'string'
      ? search.priority as LisSearchParams['priority']
      : 'all',
    status: typeof search.status === 'string'
      ? search.status as LisSearchParams['status']
      : 'all',
    sortBy: (['collectionDateTime', 'patientName', 'specimenType', 'testOrdered', 'status'] as const)
      .includes(search.sortBy as LisSearchParams['sortBy'] & string)
      ? (search.sortBy as LisSearchParams['sortBy'])
      : 'collectionDateTime',
    sortDir: search.sortDir === 'asc' || search.sortDir === 'desc'
      ? search.sortDir
      : 'desc',
  }),
});
