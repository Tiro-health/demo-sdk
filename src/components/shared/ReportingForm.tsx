import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Study } from '@/types/study';

interface ReportingFormProps {
  study: Study;
}

function generatePatientId(study: Study): string {
  const dob = study.patient.dateOfBirth.replace(/-/g, '');
  const lastName = study.patient.lastName.substring(0, 3).toUpperCase();
  return `${dob}-${lastName}`;
}

const RADIOLOGY_QUESTIONNAIRE = {
  resourceType: 'Questionnaire',
  id: 'radiology-report',
  status: 'draft',
  title: 'Radiology Report',
  item: [
    {
      linkId: 'findings',
      type: 'text',
      text: 'Findings',
    },
    {
      linkId: 'impression',
      type: 'text',
      text: 'Impression',
    },
    {
      linkId: 'recommendations',
      type: 'text',
      text: 'Recommendations',
    },
  ],
};

export function ReportingForm({ study }: ReportingFormProps) {
  const formRef = useRef<HTMLElement>(null);
  const patientId = generatePatientId(study);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleUpdate = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log('Form updated:', detail.response);
    };

    const handleSubmit = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log('Form submitted:', detail.response);
    };

    const handleError = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.error('Form error:', detail.error, 'Type:', detail.type);
    };

    const handleReady = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      console.log('Questionnaire loaded:', detail.questionnaire);
    };

    form.addEventListener('tiro-update', handleUpdate);
    form.addEventListener('tiro-submit', handleSubmit);
    form.addEventListener('tiro-error', handleError);
    form.addEventListener('tiro-ready', handleReady);

    return () => {
      form.removeEventListener('tiro-update', handleUpdate);
      form.removeEventListener('tiro-submit', handleSubmit);
      form.removeEventListener('tiro-error', handleError);
      form.removeEventListener('tiro-ready', handleReady);
    };
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Reporting</CardTitle>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>Patient: {study.patient.firstName} {study.patient.lastName} ({patientId})</div>
          <div>Accession: {study.accessionNumber}</div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <tiro-form-filler
          ref={formRef}
          id="radiology-form"
          sdc-endpoint-address="https://sdc-staging.tiro.health/fhir/r5"
          className="flex-1 overflow-auto"
        >
          <script
            type="application/fhir+json"
            slot="questionnaire"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(RADIOLOGY_QUESTIONNAIRE) }}
          />
          <button type="submit" />
        </tiro-form-filler>
      </CardContent>
    </Card>
  );
}
