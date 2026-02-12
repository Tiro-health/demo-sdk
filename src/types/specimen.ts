import type { Patient } from './common';

export type { Patient };

export type SpecimenType = 'Biopsy' | 'Resection' | 'Curettage' | 'Cell Block' | 'Frozen Section';

export type LabTest =
  | 'Histology (H&E)'
  | 'Immunohistochemistry Panel'
  | 'Margin Assessment'
  | 'Frozen Section Diagnosis'
  | 'Tumor Staging (pTNM)'
  | 'Molecular Reflex Panel'
  | 'Special Stains'
  | 'Cytology Review';

export type LabPriority = 'Routine' | 'Urgent' | 'STAT';

export type LabStatus = 'Received' | 'In Progress' | 'Completed' | 'Pending';

export type ContainerType =
  | 'Formalin Jar'
  | 'Fresh Specimen Pot'
  | 'Cassette Set'
  | 'Slide Tray'
  | 'Cytology Vial';

export type TransportCondition = 'Formalin Fixed' | 'Fresh' | 'Refrigerated' | 'Frozen';

export interface Specimen {
  id: string;
  collectionDate: string;
  collectionTime: string;
  patient: Patient;
  specimenType: SpecimenType;
  testOrdered: LabTest;
  priority: LabPriority;
  status: LabStatus;
  accessionNumber: string;
  containerType: ContainerType;
  transportCondition: TransportCondition;
  labNotes: string;
  orderingPhysician: string;
  collectionSite: string;
}
