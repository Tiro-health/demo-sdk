import { useMemo } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useStudyById } from '@/hooks/useStudies';
import { DicomViewer } from '@/components/shared/DicomViewer';
import { ParameterForm } from '@/components/shared/ParameterForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useClinician } from '@/hooks/useClinician';
import { useTranslation } from '@/hooks/useTranslation';
import { useTemplateSettings } from '@/hooks/useTemplateSettings';
import type { Study } from '@/types/study';

function generatePatientId(study: Study): string {
  const dob = study.patient.dateOfBirth.replace(/-/g, "");
  const lastName = study.patient.lastName.substring(0, 3).toUpperCase();
  return `${dob}-${lastName}`;
}

export function StudyDetailsPage() {
  const { studyId } = useParams({ from: '/pacs/study/$studyId' });
  const study = useStudyById(studyId);
  const { clinicianName } = useClinician();
  const { t } = useTranslation();
  const { enabledTemplates, defaultTemplateId, defaultTemplate } = useTemplateSettings('pacs');

  const initialParams = useMemo((): Record<string, string> => {
    if (!study) return {};
    return {
      questionnaire: defaultTemplate?.questionnaire ?? '',
      templatePreset: defaultTemplateId,
      patientId: generatePatientId(study),
      accessionNumber: study.accessionNumber,
      '0008,1030': 'T1 flare',
      clinicianName,
      theme: 'dark',
    };
  }, [study, clinicianName, defaultTemplate, defaultTemplateId]);

  if (!study) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">{t('studyNotFound')}</h1>
        <Button asChild>
          <Link to="/pacs">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('backToWorklist')}
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
            templateOptions={enabledTemplates}
          />
        </Panel>
      </Group>
    </div>
  );
}
