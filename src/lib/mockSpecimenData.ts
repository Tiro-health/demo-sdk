import type { Specimen, SpecimenType, LabTest, LabPriority, LabStatus, ContainerType, TransportCondition } from '@/types/specimen';
import {
  randomChoice, randomInt, formatNumber,
  generateDateInRange, generateTime, generatePatient,
} from './dataUtils';

const SPECIMEN_TYPES: SpecimenType[] = ['Biopsy', 'Resection', 'Curettage', 'Cell Block', 'Frozen Section'];

const TESTS_BY_SPECIMEN: Record<SpecimenType, LabTest[]> = {
  Biopsy: ['Histology (H&E)', 'Immunohistochemistry Panel', 'Special Stains'],
  Resection: ['Margin Assessment', 'Tumor Staging (pTNM)', 'Histology (H&E)'],
  Curettage: ['Histology (H&E)', 'Molecular Reflex Panel', 'Cytology Review'],
  'Cell Block': ['Cytology Review', 'Immunohistochemistry Panel', 'Special Stains'],
  'Frozen Section': ['Frozen Section Diagnosis', 'Margin Assessment'],
};

const CONTAINERS_BY_SPECIMEN: Record<SpecimenType, ContainerType[]> = {
  Biopsy: ['Formalin Jar', 'Cassette Set'],
  Resection: ['Formalin Jar', 'Fresh Specimen Pot'],
  Curettage: ['Formalin Jar', 'Cytology Vial'],
  'Cell Block': ['Cytology Vial', 'Slide Tray'],
  'Frozen Section': ['Fresh Specimen Pot', 'Slide Tray'],
};

const TRANSPORT_BY_SPECIMEN: Record<SpecimenType, TransportCondition[]> = {
  Biopsy: ['Formalin Fixed', 'Refrigerated'],
  Resection: ['Fresh', 'Refrigerated'],
  Curettage: ['Formalin Fixed'],
  'Cell Block': ['Refrigerated', 'Frozen'],
  'Frozen Section': ['Frozen', 'Fresh'],
};

const COLLECTION_SITES_BY_SPECIMEN: Record<SpecimenType, string[]> = {
  Biopsy: ['Breast core biopsy', 'Prostate core biopsy', 'Liver needle biopsy', 'Skin punch biopsy'],
  Resection: ['Colon segment resection', 'Lung wedge resection', 'Thyroid lobectomy specimen'],
  Curettage: ['Endometrial curettage', 'Bladder curettage', 'Nasal sinus curettage'],
  'Cell Block': ['Pleural fluid cell block', 'Ascites cell block', 'FNA cell block'],
  'Frozen Section': ['Sentinel node frozen section', 'Thyroid margin frozen section', 'Breast margin frozen section'],
};

const LAB_NOTES = [
  'Tumor bed marked with orientation sutures',
  'Clinical request: rule out invasive carcinoma',
  'Specimen fragmented on arrival',
  'Frozen section requested intra-operatively',
  'Margins inked by grossing pathologist',
  'Reflex IHC panel suggested by morphology',
  'Decalcification in progress',
  'Consultation requested by clinician',
  'Low cellularity; additional levels ordered',
  'Correlate with prior biopsy from same site',
  'Urgent diagnosis needed for OR decision',
  'Large specimen; gross photos archived',
  'Follow-up resection after previous positive margin',
  '',
  '',
  '',
  '',
];

const ORDERING_PHYSICIANS = [
  'Dr. Van den Berg', 'Dr. Janssens', 'Dr. Peeters', 'Dr. Maes',
  'Dr. Willems', 'Dr. Claes', 'Dr. Goossens', 'Dr. Wouters',
  'Dr. De Smedt', 'Dr. Martens', 'Dr. Jacobs', 'Dr. Mertens',
];

function generatePriority(): LabPriority {
  const rand = Math.random();
  if (rand < 0.65) return 'Routine';
  if (rand < 0.90) return 'Urgent';
  return 'STAT';
}

function generateStatus(): LabStatus {
  const rand = Math.random();
  if (rand < 0.20) return 'Received';
  if (rand < 0.50) return 'In Progress';
  if (rand < 0.85) return 'Completed';
  return 'Pending';
}

function generateSpecimen(index: number): Specimen {
  const specimenType = randomChoice(SPECIMEN_TYPES);
  const testOrdered = randomChoice(TESTS_BY_SPECIMEN[specimenType]);
  const containerType = randomChoice(CONTAINERS_BY_SPECIMEN[specimenType]);
  const transportCondition = randomChoice(TRANSPORT_BY_SPECIMEN[specimenType]);
  const collectionSite = randomChoice(COLLECTION_SITES_BY_SPECIMEN[specimenType]);

  return {
    id: `specimen-${formatNumber(index + 1, 3)}`,
    collectionDate: generateDateInRange(7),
    collectionTime: generateTime(),
    patient: generatePatient(),
    specimenType,
    testOrdered,
    priority: generatePriority(),
    status: generateStatus(),
    accessionNumber: `PATH-2026-${formatNumber(randomInt(1, 999999), 6)}`,
    containerType,
    transportCondition,
    labNotes: randomChoice(LAB_NOTES),
    orderingPhysician: randomChoice(ORDERING_PHYSICIANS),
    collectionSite,
  };
}

function generateFeaturedSpecimen(): Specimen {
  const today = new Date();
  const year = today.getFullYear();
  const month = formatNumber(today.getMonth() + 1, 2);
  const day = formatNumber(today.getDate(), 2);

  return {
    id: 'specimen-stat-frozen-section',
    collectionDate: `${year}-${month}-${day}`,
    collectionTime: '08:10',
    patient: {
      firstName: 'Nora',
      lastName: 'Vermeulen',
      gender: 'F',
      dateOfBirth: '1968-03-14',
    },
    specimenType: 'Frozen Section',
    testOrdered: 'Frozen Section Diagnosis',
    priority: 'STAT',
    status: 'In Progress',
    accessionNumber: 'PATH-2026-000001',
    containerType: 'Fresh Specimen Pot',
    transportCondition: 'Fresh',
    labNotes: 'Frozen section requested intra-operatively',
    orderingPhysician: 'Dr. Peeters',
    collectionSite: 'Breast margin frozen section',
  };
}

export function generateSpecimens(count: number = 40): Specimen[] {
  const specimens: Specimen[] = [];

  for (let i = 0; i < count; i++) {
    specimens.push(generateSpecimen(i));
  }

  // Sort by collection date and time descending (most recent first)
  specimens.sort((a, b) => {
    const dateTimeA = new Date(`${a.collectionDate}T${a.collectionTime}`).getTime();
    const dateTimeB = new Date(`${b.collectionDate}T${b.collectionTime}`).getTime();
    return dateTimeB - dateTimeA;
  });

  // Always add featured specimen at the top
  specimens.unshift(generateFeaturedSpecimen());

  return specimens;
}
