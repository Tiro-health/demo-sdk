import { Modality, UrgencyLevel } from './study';

export interface WorklistSearchParams {
  search?: string;
  modality?: Modality | 'all';
  urgency?: UrgencyLevel | 'all';
  sortBy?: 'dateTime' | 'patientName' | 'modality';
  sortDir?: 'asc' | 'desc';
}

// Validator for TanStack Router
export const worklistSearchParamsSchema = {
  search: (value: unknown): string | undefined => (typeof value === 'string' ? value : undefined),
  modality: (value: unknown): string => (typeof value === 'string' ? value : 'all'),
  urgency: (value: unknown): string => (typeof value === 'string' ? value : 'all'),
  sortBy: (value: unknown): 'dateTime' | 'patientName' | 'modality' =>
    (value === 'dateTime' || value === 'patientName' || value === 'modality'
      ? value
      : 'dateTime'),
  sortDir: (value: unknown): 'asc' | 'desc' =>
    (value === 'asc' || value === 'desc' ? value : 'desc'),
} as const;
