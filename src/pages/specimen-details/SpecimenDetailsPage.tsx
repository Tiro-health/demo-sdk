import { useMemo } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useSpecimenById } from '@/hooks/useSpecimens';
import { SpecimenInfoCard } from './SpecimenInfoCard';
import { ParameterForm } from '@/components/shared/ParameterForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DEMO_CONFIGS } from '@/lib/demoRegistry';
import { useClinician } from '@/hooks/useClinician';
import { useTranslation } from '@/hooks/useTranslation';
import type { Specimen } from '@/types/specimen';

const LIS_BASIC_TEMPLATE_URL = 'http://templates.tiro.health/templates/3640e41dba1e4318934e411a054cd721';
const ADVANCED_TEMPLATE_URL = 'http://templates.tiro.health/templates/b18e0a6605bb437e90d54f8ec65eeb1d';
const OVARIO_TEMPLATE_URL = 'http://templates.tiro.health/templates/7aaacc5c2d5a48a38d40b3d2bb5afb64';
const ER_PR_HER2_TEMPLATE_URL = 'http://templates.tiro.health/templates/2ff90405d2bf4bbba8941b61d4881d78';
const MONDHOLTE_TEMPLATE_URL = 'http://templates.tiro.health/templates/049555af4ddf4a74b7d2572f7000b12c';

function generatePatientId(specimen: Specimen): string {
  const dob = specimen.patient.dateOfBirth.replace(/-/g, '');
  const lastName = specimen.patient.lastName.substring(0, 3).toUpperCase();
  return `${dob}-${lastName}`;
}

export function SpecimenDetailsPage() {
  const { specimenId } = useParams({ from: '/lis/specimen/$specimenId' });
  const specimen = useSpecimenById(specimenId);
  const { clinicianName } = useClinician();
  const { t } = useTranslation();

  const initialParams = useMemo((): Record<string, string> => {
    if (!specimen) return {};
    return {
      questionnaire: DEMO_CONFIGS.lis.defaultTemplateUrl,
      patientId: generatePatientId(specimen),
      accessionNumber: specimen.accessionNumber,
      specimenType: specimen.specimenType,
      testOrdered: specimen.testOrdered,
      clinicianName,
      templatePreset: 'thyroid',
      theme: 'light',
      demoType: 'lis',
    };
  }, [specimen, clinicianName]);

  if (!specimen) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">{t('specimenNotFound')}</h1>
        <Button asChild>
          <Link to="/lis">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('backToWorklist')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] p-4 bg-white">
      <Group orientation="horizontal" className="h-full">
        <Panel defaultSize={40} minSize={25}>
          <SpecimenInfoCard specimen={specimen} />
        </Panel>
        <Separator className="resize-handle mx-2" />
        <Panel defaultSize={60} minSize={30}>
          <ParameterForm
            initialParams={initialParams}
            showTemplatePicker
            templateOptions={[
              { id: 'thyroid', label: 'Thyroid reporting', questionnaire: DEMO_CONFIGS.lis.defaultTemplateUrl },
              { id: 'basic', label: 'Basic template', questionnaire: LIS_BASIC_TEMPLATE_URL },
              { id: 'advanced', label: 'Advanced template', questionnaire: ADVANCED_TEMPLATE_URL },
              { id: 'ovario', label: 'Cuestionario de Ovario', questionnaire: OVARIO_TEMPLATE_URL },
              { id: 'er-pr-her2', label: 'ER/PR/HER2 rapportering', questionnaire: ER_PR_HER2_TEMPLATE_URL },
              { id: 'mondholte', label: 'Mondholte tumoren', questionnaire: MONDHOLTE_TEMPLATE_URL },
            ]}
          />
        </Panel>
      </Group>
    </div>
  );
}
