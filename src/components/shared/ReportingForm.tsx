import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Reporting</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
        <form
          action="/launch.html"
          method="GET"
          target="sdk-frame"
          className="flex flex-col gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="accessionNumber" className="text-sm font-medium">
                Accession Number
              </label>
              <Input
                id="accessionNumber"
                name="accessionNumber"
                value={study.accessionNumber}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="patientId" className="text-sm font-medium">
                Patient ID
              </label>
              <Input
                id="patientId"
                name="patientId"
                value={patientId}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Launch Report
          </Button>
        </form>
        <iframe
          name="sdk-frame"
          className="flex-1 rounded-md border border-border bg-background"
          title="Tiro.health SDK"
          allow="clipboard-read; clipboard-write"
        />
      </CardContent>
    </Card>
  );
}
