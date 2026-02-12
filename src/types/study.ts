import type { Patient } from './common';

export type { Patient };

export type Modality = 'XA' | 'DX' | 'PT' | 'NM' | 'MG' | 'CR' | 'MR' | 'CT';

export type UrgencyLevel = 'Routine' | 'Urgent' | 'STAT' | 'Emergency';

export interface Study {
  id: string;
  studyDate: string; // "2025-12-22"
  studyTime: string; // "18:02"
  patient: Patient;
  modality: Modality;
  studyDescription: string;
  researchQuestion: string;
  urgency: UrgencyLevel;
  accessionNumber: string; // "ACC-2025-001234"
}

export interface SortConfig {
  key: 'dateTime' | 'patientName' | 'modality';
  direction: 'asc' | 'desc';
}
