import { createFileRoute } from '@tanstack/react-router';
import { WorklistPage } from '@/pages/worklist/WorklistPage';
import type { WorklistSearchParams } from '@/types/search-params';

export const Route = createFileRoute('/pacs/')({
  component: WorklistPage,
  validateSearch: (search: Record<string, unknown>): WorklistSearchParams => ({
    search: typeof search.search === 'string' ? search.search : undefined,
    modality: typeof search.modality === 'string' ? search.modality as WorklistSearchParams['modality'] : 'all',
    urgency: typeof search.urgency === 'string' ? search.urgency as WorklistSearchParams['urgency'] : 'all',
    sortBy: search.sortBy === 'dateTime' || search.sortBy === 'patientName' || search.sortBy === 'modality'
      ? search.sortBy
      : 'dateTime',
    sortDir: search.sortDir === 'asc' || search.sortDir === 'desc'
      ? search.sortDir
      : 'desc',
  }),
});
