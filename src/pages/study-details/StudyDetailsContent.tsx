import { Study } from '@/types/study';
import { Card } from '@/components/ui/card';
import { ModalityBadge } from '@/components/shared/ModalityBadge';

interface Props {
  study: Study;
}

export function StudyDetailsContent({ study }: Props) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Study Details</h2>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Patient</dt>
            <dd className="text-lg">{study.patient.firstName} {study.patient.lastName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Modality</dt>
            <dd><ModalityBadge modality={study.modality} /></dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Study Date</dt>
            <dd>{study.studyDate}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Study Time</dt>
            <dd>{study.studyTime}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium text-muted-foreground">Description</dt>
            <dd>{study.studyDescription}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium text-muted-foreground">Research Question</dt>
            <dd>{study.researchQuestion}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Urgency</dt>
            <dd>{study.urgency}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Accession Number</dt>
            <dd className="font-mono text-sm">{study.accessionNumber}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
