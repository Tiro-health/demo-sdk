import { useMatch } from '@tanstack/react-router';
import { useStudyById } from '@/hooks/useStudies';
import { DemoHeader } from '@/components/shared/DemoHeader';

export function PacsHeader() {
  const studyMatch = useMatch({ from: '/pacs/study/$studyId', shouldThrow: false });
  const studyId = studyMatch?.params?.studyId;
  const study = useStudyById(studyId);

  return (
    <DemoHeader
      demoType="pacs"
      showBackButton={!!study}
      backTo="/pacs"
      contextInfo={study && (
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Patient: </span>
            <span className="font-medium">{study.patient.lastName}, {study.patient.firstName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Accession: </span>
            <span className="font-mono">{study.accessionNumber}</span>
          </div>
        </div>
      )}
    />
  );
}
