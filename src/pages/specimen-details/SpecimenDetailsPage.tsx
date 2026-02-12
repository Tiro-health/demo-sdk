import { useMemo } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useSpecimenById } from '@/hooks/useSpecimens';
import { SpecimenInfoCard } from './SpecimenInfoCard';
import { ParameterForm } from '@/components/shared/ParameterForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DEMO_CONFIGS } from '@/lib/demoRegistry';
import type { Specimen } from '@/types/specimen';

const LIS_BASIC_TEMPLATE_URL = 'http://templates.tiro.health/templates/3640e41dba1e4318934e411a054cd721';
const ADVANCED_TEMPLATE_URL = 'http://templates.tiro.health/templates/b18e0a6605bb437e90d54f8ec65eeb1d';

function generatePatientId(specimen: Specimen): string {
  const dob = specimen.patient.dateOfBirth.replace(/-/g, '');
  const lastName = specimen.patient.lastName.substring(0, 3).toUpperCase();
  return `${dob}-${lastName}`;
}

export function SpecimenDetailsPage() {
  const { specimenId } = useParams({ from: '/lis/specimen/$specimenId' });
  const specimen = useSpecimenById(specimenId);

  const initialParams = useMemo((): Record<string, string> => {
    if (!specimen) return {};
    return {
      questionnaire: DEMO_CONFIGS.lis.defaultTemplateUrl,
      patientId: generatePatientId(specimen),
      accessionNumber: specimen.accessionNumber,
      specimenType: specimen.specimenType,
      testOrdered: specimen.testOrdered,
      clinicianName: 'dr. Peeters',
      templatePreset: 'thyroid',
      theme: 'light',
      demoType: 'lis',
    };
  }, [specimen]);

  if (!specimen) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Specimen not found</h1>
        <Button asChild>
          <Link to="/lis">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Worklist
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
            ]}
          />
        </Panel>
      </Group>
    </div>
  );
}
