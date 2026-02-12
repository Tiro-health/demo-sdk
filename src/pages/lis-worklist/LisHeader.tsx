import { useMatch } from '@tanstack/react-router';
import { useSpecimenById } from '@/hooks/useSpecimens';
import { DemoHeader } from '@/components/shared/DemoHeader';

export function LisHeader() {
  const specimenMatch = useMatch({ from: '/lis/specimen/$specimenId', shouldThrow: false });
  const specimenId = specimenMatch?.params?.specimenId;
  const specimen = useSpecimenById(specimenId);

  return (
    <DemoHeader
      demoType="lis"
      showBackButton={!!specimen}
      backTo="/lis"
      contextInfo={specimen && (
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Patient: </span>
            <span className="font-medium">{specimen.patient.lastName}, {specimen.patient.firstName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Specimen: </span>
            <span className="font-mono">{specimen.accessionNumber}</span>
          </div>
        </div>
      )}
    />
  );
}
