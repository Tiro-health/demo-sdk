import { useMemo, useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParameterForm } from '@/components/shared/ParameterForm';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useClinician } from '@/hooks/useClinician';

const EHR_TEMPLATE_URL = 'http://templates.tiro.health/templates/11bc9b87d0744edb843ca6250ce24494';
const ADVANCED_TEMPLATE_URL = 'http://templates.tiro.health/templates/b18e0a6605bb437e90d54f8ec65eeb1d';

type EhrPatient = {
  id: string;
  given: string;
  family: string;
  avatarUrl: string;
  birthDate: string;
  ageLabel: string;
  weightKg: number;
  heightCm: number;
  encounterId: string;
  encounterLabel: string;
  encounterMeta: string;
  allergies: string[];
  activeProblems: Array<{
    since: string;
    label: string;
    status: string;
  }>;
  notes: string[];
};

const EHR_PATIENTS: EhrPatient[] = [
  {
    id: '19581201-PEE',
    given: 'Marc',
    family: 'Peeters',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    birthDate: '1958-12-01',
    ageLabel: '67 years',
    weightKg: 82,
    heightCm: 178,
    encounterId: 'ENC-2026-00214',
    encounterLabel: 'Robotic Assisted Radical Prostatectomy (RARP)',
    encounterMeta: 'OR 4 • Elective procedure • Encounter ENC-2026-00214',
    allergies: ['Penicillin', 'Latex'],
    activeProblems: [
      { since: '2024-11-12', label: 'Localized prostate adenocarcinoma (cT2)', status: 'Active' },
      { since: '2023-06-04', label: 'Essential hypertension', status: 'Controlled' },
      { since: '2022-09-19', label: 'Benign prostatic hyperplasia', status: 'Active' },
    ],
    notes: [
      'Pre-op MRI reviewed by multidisciplinary team.',
      'No intra-operative complications reported.',
      'Planned post-op pathway documented in EHR.',
    ],
  },
  {
    id: '19600419-VDB',
    given: 'Luc',
    family: 'Van den Broeck',
    avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    birthDate: '1960-04-19',
    ageLabel: '65 years',
    weightKg: 86,
    heightCm: 181,
    encounterId: 'ENC-2026-00331',
    encounterLabel: 'Robot-assisted partial nephrectomy',
    encounterMeta: 'OR 2 • Scheduled procedure • Encounter ENC-2026-00331',
    allergies: ['Iodinated contrast'],
    activeProblems: [
      { since: '2025-01-28', label: 'Left renal mass (Bosniak IV)', status: 'Active' },
      { since: '2021-08-16', label: 'Type 2 diabetes mellitus', status: 'Active' },
    ],
    notes: [
      'Peri-operative antibiotic prophylaxis completed.',
      'Estimated blood loss documented as minimal.',
      'Pathology follow-up requested in 5 working days.',
    ],
  },
  {
    id: '19590523-DSM',
    given: 'Jan',
    family: 'De Smet',
    avatarUrl: 'https://randomuser.me/api/portraits/men/61.jpg',
    birthDate: '1959-05-23',
    ageLabel: '66 years',
    weightKg: 79,
    heightCm: 175,
    encounterId: 'ENC-2026-00376',
    encounterLabel: 'Transurethral resection of bladder tumor (TURBT)',
    encounterMeta: 'OR 3 • Day surgery • Encounter ENC-2026-00376',
    allergies: ['Sulfonamides'],
    activeProblems: [
      { since: '2025-10-03', label: 'Non-muscle invasive bladder tumor', status: 'Active' },
      { since: '2020-02-14', label: 'Hyperlipidemia', status: 'Controlled' },
    ],
    notes: [
      'Smoking cessation advised pre-operatively.',
      'Urine cytology discussed during tumor board.',
      'Post-op intravesical treatment under consideration.',
    ],
  },
  {
    id: '19620315-MVR',
    given: 'Peter',
    family: 'Maes',
    avatarUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
    birthDate: '1962-03-15',
    ageLabel: '63 years',
    weightKg: 91,
    heightCm: 184,
    encounterId: 'ENC-2026-00402',
    encounterLabel: 'Laparoscopic radical nephrectomy',
    encounterMeta: 'OR 1 • Inpatient • Encounter ENC-2026-00402',
    allergies: ['None reported'],
    activeProblems: [
      { since: '2025-12-09', label: 'Right renal cell carcinoma', status: 'Active' },
      { since: '2024-04-21', label: 'Chronic kidney disease stage 2', status: 'Active' },
    ],
    notes: [
      'Renal function stable on pre-op labs.',
      'Anesthesia clearance completed without restrictions.',
      'Enhanced recovery pathway activated.',
    ],
  },
  {
    id: '19570708-LHC',
    given: 'Koen',
    family: 'Lemmens',
    avatarUrl: 'https://randomuser.me/api/portraits/men/71.jpg',
    birthDate: '1957-07-08',
    ageLabel: '68 years',
    weightKg: 77,
    heightCm: 172,
    encounterId: 'ENC-2026-00451',
    encounterLabel: 'Open simple prostatectomy',
    encounterMeta: 'OR 5 • Inpatient • Encounter ENC-2026-00451',
    allergies: ['Cefazolin', 'Adhesive tape'],
    activeProblems: [
      { since: '2023-11-18', label: 'Severe lower urinary tract symptoms', status: 'Active' },
      { since: '2019-01-09', label: 'Atrial fibrillation', status: 'Controlled' },
    ],
    notes: [
      'Cardiology advised temporary anticoagulation bridging.',
      'Bladder outlet obstruction confirmed on urodynamics.',
      'Post-op catheter plan documented.',
    ],
  },
  {
    id: '19610511-RDM',
    given: 'Tom',
    family: 'Raes',
    avatarUrl: 'https://randomuser.me/api/portraits/men/73.jpg',
    birthDate: '1961-05-11',
    ageLabel: '64 years',
    weightKg: 88,
    heightCm: 179,
    encounterId: 'ENC-2026-00488',
    encounterLabel: 'MRI-fusion guided prostate biopsy',
    encounterMeta: 'Procedure room • Outpatient • Encounter ENC-2026-00488',
    allergies: ['Chlorhexidine'],
    activeProblems: [
      { since: '2026-01-07', label: 'Elevated PSA under evaluation', status: 'Active' },
      { since: '2022-03-29', label: 'Obstructive sleep apnea', status: 'Active' },
    ],
    notes: [
      'Antibiotic prophylaxis tailored to prior cultures.',
      'Lesions PI-RADS 4 and 5 sampled.',
      'Awaiting histopathology and MDT discussion.',
    ],
  },
  {
    id: '19560430-VDW',
    given: 'Dirk',
    family: 'Verhoeven',
    avatarUrl: 'https://randomuser.me/api/portraits/men/79.jpg',
    birthDate: '1956-04-30',
    ageLabel: '69 years',
    weightKg: 74,
    heightCm: 170,
    encounterId: 'ENC-2026-00512',
    encounterLabel: 'Cystoprostatectomy with urinary diversion',
    encounterMeta: 'OR 6 • Tertiary referral • Encounter ENC-2026-00512',
    allergies: ['Morphine'],
    activeProblems: [
      { since: '2025-08-15', label: 'Muscle-invasive bladder carcinoma', status: 'Active' },
      { since: '2021-07-02', label: 'Coronary artery disease', status: 'Controlled' },
      { since: '2020-12-06', label: 'Chronic anemia', status: 'Active' },
    ],
    notes: [
      'Prehabilitation completed with nutrition team.',
      'Stoma marking done prior to admission.',
      'Transfusion strategy agreed with anesthesia.',
    ],
  },
];

export function EhrPage() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(EHR_PATIENTS[0].id);
  const { clinicianName } = useClinician();
  const selectedPatient = useMemo(
    () => EHR_PATIENTS.find((patient) => patient.id === selectedPatientId) ?? EHR_PATIENTS[0],
    [selectedPatientId]
  );

  const initialParams: Record<string, string> = useMemo(() => ({
    questionnaire: EHR_TEMPLATE_URL,
    templatePreset: 'rarp',
    patientId: selectedPatient.id,
    patientGiven: selectedPatient.given,
    patientFamily: selectedPatient.family,
    patientBirthDate: selectedPatient.birthDate,
    encounterId: selectedPatient.encounterId,
    clinicianName,
    theme: 'light',
    demoType: 'ehr',
  }), [selectedPatient, clinicianName]);

  return (
    <div className="h-[calc(100vh-3.5rem)] p-4 bg-[radial-gradient(1200px_520px_at_10%_-10%,rgba(59,130,246,0.10),transparent_65%),radial-gradient(900px_420px_at_100%_-5%,rgba(16,185,129,0.08),transparent_62%),#ffffff]">
      <Group orientation="horizontal" className="h-full">
        <Panel defaultSize={42} minSize={28}>
          <Card className="flex h-full min-h-0 flex-col border border-border/50 bg-[#FAFAFA] shadow-sm">
            <CardHeader className="px-6 pb-2 pt-5">
              <CardTitle className="text-lg">Patient Context</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 space-y-4 overflow-y-auto px-6 pb-6 pt-2 text-sm">
              <section className="rounded-xl border border-border/50 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Active patient</div>
                <div className="mt-2">
                  <Select value={selectedPatient.id} onValueChange={setSelectedPatientId}>
                    <SelectTrigger className="h-9 w-full border-black/10 bg-white/70 text-slate-800 shadow-none focus:ring-0 focus-visible:ring-0">
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedPatient.avatarUrl}
                          alt={`${selectedPatient.given} ${selectedPatient.family}`}
                          className="h-5 w-5 rounded-full border border-slate-200 object-cover"
                        />
                        <span className="truncate">
                          {selectedPatient.family}, {selectedPatient.given}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="border-black/10 bg-white text-slate-800 shadow-xl">
                      {EHR_PATIENTS.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id} className="focus:bg-slate-100">
                          <div className="flex items-center gap-2">
                            <img
                              src={patient.avatarUrl}
                              alt={`${patient.given} ${patient.family}`}
                              className="h-5 w-5 rounded-full border border-slate-200 object-cover"
                            />
                            <span>{patient.family}, {patient.given}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </section>
              <section className="rounded-xl border border-border/50 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Patient</div>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={selectedPatient.avatarUrl}
                    alt={`${selectedPatient.given} ${selectedPatient.family}`}
                    className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                  />
                  <div className="text-base font-semibold">{selectedPatient.family}, {selectedPatient.given}</div>
                </div>
                <div className="text-muted-foreground">DOB {selectedPatient.birthDate} • Male • {selectedPatient.ageLabel}</div>
              </section>
              <section className="rounded-xl border border-border/50 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Allergies</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPatient.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </section>
              <section className="rounded-xl border border-border/50 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Current Encounter</div>
                <div className="mt-2">{selectedPatient.encounterLabel}</div>
                <div className="text-muted-foreground">{selectedPatient.encounterMeta}</div>
              </section>
              <section className="rounded-xl border border-border/50 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Active Problems</div>
                <ul className="mt-2 space-y-2">
                  {selectedPatient.activeProblems.map((problem) => (
                    <li key={`${problem.since}-${problem.label}`} className="rounded-md border border-border/60 bg-[#FAFAFA] p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-muted-foreground">{problem.since}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{problem.status}</span>
                      </div>
                      <div className="mt-1 text-sm text-slate-800">{problem.label}</div>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-xl border border-border/50 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Clinical Notes</div>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {selectedPatient.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </section>
              <section className="rounded-xl border border-border/50 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Biometrics</div>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div>
                    <span className="text-xs uppercase tracking-wide">Weight</span>
                    <div className="mt-0.5 font-medium text-slate-700">{selectedPatient.weightKg} kg</div>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wide">Height</span>
                    <div className="mt-0.5 font-medium text-slate-700">{selectedPatient.heightCm} cm</div>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </Panel>
        <Separator className="resize-handle mx-2" />
        <Panel defaultSize={58} minSize={32}>
          <ParameterForm
            key={`ehr-${selectedPatient.id}`}
            initialParams={initialParams}
            showTemplatePicker
            templateOptions={[
              { id: 'rarp', label: 'Operatieverslag RARP', questionnaire: EHR_TEMPLATE_URL },
              { id: 'advanced', label: 'Advanced template', questionnaire: ADVANCED_TEMPLATE_URL },
            ]}
          />
        </Panel>
      </Group>
    </div>
  );
}
