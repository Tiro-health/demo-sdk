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

export function ReportingForm({ study }: ReportingFormProps) {
  const patientId = generatePatientId(study);
  const launchUrl = `/launch.html?patientId=${encodeURIComponent(patientId)}&accessionNumber=${encodeURIComponent(study.accessionNumber)}`;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Reporting</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <iframe
          src={launchUrl}
          className="flex-1 rounded-md border-0"
          title="Tiro.health SDK"
          allow="clipboard-read; clipboard-write"
        />
      </CardContent>
    </Card>
  );
}
