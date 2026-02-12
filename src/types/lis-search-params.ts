import type { SpecimenType, LabPriority, LabStatus } from './specimen';

export interface LisSearchParams {
  search?: string;
  specimenType?: SpecimenType | 'all';
  priority?: LabPriority | 'all';
  status?: LabStatus | 'all';
  sortBy?: 'collectionDateTime' | 'patientName' | 'specimenType' | 'testOrdered' | 'status';
  sortDir?: 'asc' | 'desc';
}
