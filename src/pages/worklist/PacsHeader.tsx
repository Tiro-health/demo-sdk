import { useMatch } from '@tanstack/react-router';
import { useStudyById } from '@/hooks/useStudies';
import { DemoHeader } from '@/components/shared/DemoHeader';
import { useTranslation } from '@/hooks/useTranslation';

export function PacsHeader() {
  const studyMatch = useMatch({ from: '/pacs/study/$studyId', shouldThrow: false });
  const studyId = studyMatch?.params?.studyId;
  const study = useStudyById(studyId);
  const { t } = useTranslation();

  return (
    <DemoHeader
      demoType="pacs"
      showBackButton={!!study}
      backTo="/pacs"
      contextInfo={study && (
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">{t('patientLabel')} </span>
            <span className="font-medium">{study.patient.lastName}, {study.patient.firstName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{t('accessionLabel')} </span>
            <span className="font-mono">{study.accessionNumber}</span>
          </div>
        </div>
      )}
    />
  );
}
