import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpecimenTypeBadge } from '@/components/shared/SpecimenTypeBadge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PriorityBadge } from '@/components/shared/PriorityBadge';
import { useTranslation } from '@/hooks/useTranslation';
import type { Specimen } from '@/types/specimen';

interface SpecimenInfoCardProps {
  specimen: Specimen;
}

export function SpecimenInfoCard({ specimen }: SpecimenInfoCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="h-full flex flex-col bg-[#FAFAFA]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t('specimenDetails')}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto space-y-6">
        {/* Status & Priority */}
        <div className="flex items-center gap-3">
          <StatusBadge status={specimen.status} />
          <PriorityBadge priority={specimen.priority} />
        </div>

        {/* Patient Info */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t('patient')}</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">{t('name')}</span>
            <span className="font-medium">{specimen.patient.lastName}, {specimen.patient.firstName}</span>
            <span className="text-muted-foreground">{t('gender')}</span>
            <span>{specimen.patient.gender === 'M' ? t('male') : t('female')}</span>
            <span className="text-muted-foreground">{t('dateOfBirth')}</span>
            <span>{specimen.patient.dateOfBirth}</span>
          </div>
        </section>

        {/* Collection Info */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t('collection')}</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">{t('dateAndTime')}</span>
            <span>{specimen.collectionDate} {specimen.collectionTime}</span>
            <span className="text-muted-foreground">{t('collectionSite')}</span>
            <span>{specimen.collectionSite}</span>
            <span className="text-muted-foreground">{t('orderingPhysician')}</span>
            <span>{specimen.orderingPhysician}</span>
          </div>
        </section>

        {/* Specimen Info */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t('specimenSection')}</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">{t('type')}</span>
            <span><SpecimenTypeBadge specimenType={specimen.specimenType} /></span>
            <span className="text-muted-foreground">{t('testOrdered')}</span>
            <span className="font-medium">{specimen.testOrdered}</span>
            <span className="text-muted-foreground">{t('container')}</span>
            <span>{specimen.containerType}</span>
            <span className="text-muted-foreground">{t('transport')}</span>
            <span>{specimen.transportCondition}</span>
            <span className="text-muted-foreground">{t('accessionNumber')}</span>
            <span className="font-mono">{specimen.accessionNumber}</span>
          </div>
        </section>

        {/* Lab Notes */}
        {specimen.labNotes && (
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t('labNotes')}</h3>
            <p className="text-sm bg-muted/50 rounded-md p-3">{specimen.labNotes}</p>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
