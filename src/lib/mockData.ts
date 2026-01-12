import type { Study, Patient, Modality, UrgencyLevel } from '@/types/study';

// Data pools for random selection
const FIRST_NAMES_M = [
  'James', 'Robert', 'John', 'Michael', 'William', 'David', 'Richard', 'Joseph',
  'Thomas', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald',
];

const FIRST_NAMES_F = [
  'Mary', 'Jennifer', 'Linda', 'Patricia', 'Elizabeth', 'Barbara', 'Susan',
  'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
];

const MODALITIES: Modality[] = ['XA', 'DX', 'PT', 'NM', 'MG', 'CR', 'MR', 'CT'];

// Study descriptions mapped by modality
const STUDY_DESCRIPTIONS: Record<Modality, string[]> = {
  XA: [
    'Angiography Coronary',
    'Angiography Cerebral',
    'Angiography Lower Extremity',
    'Angiography Renal',
  ],
  DX: [
    'Chest X-Ray PA and Lateral',
    'Abdomen X-Ray Single View',
    'Knee X-Ray 3 Views',
    'Spine Cervical X-Ray',
    'Pelvis X-Ray Single View',
  ],
  PT: [
    'PET/CT Whole Body',
    'PET/CT Brain',
    'PET/CT Chest/Abdomen/Pelvis',
  ],
  NM: [
    'Nuclear Medicine Bone Scan',
    'Thyroid Scan',
    'Cardiac Stress Test',
    'Hepatobiliary Scan',
  ],
  MG: [
    'Mammogram Bilateral Screening',
    'Mammogram Diagnostic Unilateral',
    'Mammogram Bilateral Diagnostic',
  ],
  CR: [
    'CR Chest PA',
    'CR Hand 3 Views',
    'CR Spine Cervical',
    'CR Foot 3 Views',
  ],
  MR: [
    'MRI Brain without contrast',
    'MRI Lumbar Spine',
    'MRI Knee without contrast',
    'MRI Cervical Spine',
    'MRI Shoulder without contrast',
  ],
  CT: [
    'CT Head without contrast',
    'CT Chest/Abdomen/Pelvis with contrast',
    'CT Angiography',
    'CT Abdomen and Pelvis with contrast',
    'CT Chest with contrast',
  ],
};

const RESEARCH_QUESTIONS = [
  'Evaluate for malignancy',
  'Assess for appendicitis',
  'Rule out fracture',
  'Rule out pulmonary embolism',
  'Assess for pneumonia',
  'Follow-up known lesion',
  'Post-operative evaluation',
  'Evaluate abdominal pain',
  'Rule out stroke',
  'Evaluate for acute intracranial hemorrhage',
  'Screening examination',
  'Evaluate for infection',
  'Rule out internal bleeding',
  'Assess for disc herniation',
  'Evaluate joint effusion',
];

// Helper functions
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(num: number, length: number): string {
  return num.toString().padStart(length, '0');
}

function generateDateInRange(daysBack: number): string {
  const today = new Date();
  const randomDaysBack = Math.floor(Math.random() * daysBack);
  const date = new Date(today);
  date.setDate(date.getDate() - randomDaysBack);

  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1, 2);
  const day = formatNumber(date.getDate(), 2);

  return `${year}-${month}-${day}`;
}

function generateTime(): string {
  // Working hours: 08:00 - 19:00
  const hour = randomInt(8, 19);
  const minute = randomInt(0, 59);

  return `${formatNumber(hour, 2)}:${formatNumber(minute, 2)}`;
}

function generateDOB(): string {
  // Birth years 1940-2010 (ages 15-85)
  const year = randomInt(1940, 2010);
  const month = randomInt(1, 12);
  const day = randomInt(1, 28); // Safe for all months

  return `${year}-${formatNumber(month, 2)}-${formatNumber(day, 2)}`;
}

function generatePatient(): Patient {
  const gender: 'M' | 'F' = Math.random() < 0.5 ? 'M' : 'F';
  const firstNames = gender === 'M' ? FIRST_NAMES_M : FIRST_NAMES_F;

  return {
    firstName: randomChoice(firstNames),
    lastName: randomChoice(LAST_NAMES),
    gender,
    dateOfBirth: generateDOB(),
  };
}

function generateUrgency(): UrgencyLevel {
  const rand = Math.random();

  // Distribution: 60% Routine, 25% Urgent, 10% STAT, 5% Emergency
  if (rand < 0.60) return 'Routine';
  if (rand < 0.85) return 'Urgent';
  if (rand < 0.95) return 'STAT';
  return 'Emergency';
}

function generateStudy(index: number): Study {
  const modality = randomChoice(MODALITIES);
  const studyDescription = randomChoice(STUDY_DESCRIPTIONS[modality]);
  const researchQuestion = randomChoice(RESEARCH_QUESTIONS);
  const urgency = generateUrgency();

  return {
    id: `study-${formatNumber(index + 1, 3)}`,
    studyDate: generateDateInRange(7), // Last 7 days
    studyTime: generateTime(),
    patient: generatePatient(),
    modality,
    studyDescription,
    researchQuestion,
    urgency,
    accessionNumber: `ACC-2025-${formatNumber(randomInt(1, 999999), 6)}`,
  };
}

export function generateStudies(count: number = 40): Study[] {
  const studies: Study[] = [];

  for (let i = 0; i < count; i++) {
    studies.push(generateStudy(i));
  }

  // Sort by date and time descending (most recent first)
  studies.sort((a, b) => {
    const dateTimeA = new Date(`${a.studyDate}T${a.studyTime}`).getTime();
    const dateTimeB = new Date(`${b.studyDate}T${b.studyTime}`).getTime();
    return dateTimeB - dateTimeA;
  });

  return studies;
}
