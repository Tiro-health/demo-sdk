import { useMemo } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useStudyById } from '@/hooks/useStudies';
import { DicomViewer } from '@/components/shared/DicomViewer';
import { ParameterForm } from '@/components/shared/ParameterForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Study } from '@/types/study';

const DEFAULT_QUESTIONNAIRE =
  "http://templates.tiro.health/templates/aa87c115c40149e98faba070cacb15c9";
const PACS_TEMPLATE_URL =
  "http://templates.tiro.health/templates/8d7ab478ce8b4dc3a84b7b33ab34b335";

function generatePatientId(study: Study): string {
  const dob = study.patient.dateOfBirth.replace(/-/g, "");
  const lastName = study.patient.lastName.substring(0, 3).toUpperCase();
  return `${dob}-${lastName}`;
}

export function StudyDetailsPage() {
  const { studyId } = useParams({ from: '/pacs/study/$studyId' });
  const study = useStudyById(studyId);

  const initialParams = useMemo((): Record<string, string> => {
    if (!study) return {};
    return {
      questionnaire: DEFAULT_QUESTIONNAIRE,
      templatePreset: 'radiology',
      patientId: generatePatientId(study),
      accessionNumber: study.accessionNumber,
      '0008,1030': 'T1 flare',
      theme: 'dark',
    };
  }, [study]);

  if (!study) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Study not found</h1>
        <Button asChild>
          <Link to="/pacs">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Worklist
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] p-4">
      <Group orientation="horizontal" className="h-full">
        <Panel defaultSize={50} minSize={30}>
          <DicomViewer />
        </Panel>
        <Separator className="resize-handle mx-2" />
        <Panel defaultSize={50} minSize={30}>
          <ParameterForm
            initialParams={initialParams}
            panelTone="dark"
            showTemplatePicker
            templateOptions={[
              { id: 'radiology', label: 'Radiology reporting', questionnaire: DEFAULT_QUESTIONNAIRE },
              { id: 'basic', label: 'Basic template', questionnaire: PACS_TEMPLATE_URL },
            ]}
          />
        </Panel>
      </Group>
    </div>
  );
}
