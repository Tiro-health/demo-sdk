import { Activity } from 'lucide-react';
import { useMatch } from '@tanstack/react-router';
import { useStudyById } from '@/hooks/useStudies';

export function Header() {
  const studyMatch = useMatch({ from: '/study/$studyId', shouldThrow: false });
  const studyId = studyMatch?.params?.studyId;
  const study = useStudyById(studyId);

  return (
    <header className="header-blur sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Radiology Worklist</h1>
            <p className="text-xs text-muted-foreground">Tiro.health Demo</p>
          </div>
        </div>
        {study && (
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
      </div>
    </header>
  );
}
