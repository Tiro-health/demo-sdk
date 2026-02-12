import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpecimenTypeBadge } from '@/components/shared/SpecimenTypeBadge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PriorityBadge } from '@/components/shared/PriorityBadge';
import type { Specimen } from '@/types/specimen';

interface SpecimenInfoCardProps {
  specimen: Specimen;
}

export function SpecimenInfoCard({ specimen }: SpecimenInfoCardProps) {
  return (
    <Card className="h-full flex flex-col bg-[#FAFAFA]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Specimen Details</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto space-y-6">
        {/* Status & Priority */}
        <div className="flex items-center gap-3">
          <StatusBadge status={specimen.status} />
          <PriorityBadge priority={specimen.priority} />
        </div>

        {/* Patient Info */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Patient</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{specimen.patient.lastName}, {specimen.patient.firstName}</span>
            <span className="text-muted-foreground">Gender</span>
            <span>{specimen.patient.gender === 'M' ? 'Male' : 'Female'}</span>
            <span className="text-muted-foreground">Date of Birth</span>
            <span>{specimen.patient.dateOfBirth}</span>
          </div>
        </section>

        {/* Collection Info */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Collection</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">Date & Time</span>
            <span>{specimen.collectionDate} {specimen.collectionTime}</span>
            <span className="text-muted-foreground">Collection Site</span>
            <span>{specimen.collectionSite}</span>
            <span className="text-muted-foreground">Ordering Physician</span>
            <span>{specimen.orderingPhysician}</span>
          </div>
        </section>

        {/* Specimen Info */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Specimen</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">Type</span>
            <span><SpecimenTypeBadge specimenType={specimen.specimenType} /></span>
            <span className="text-muted-foreground">Test Ordered</span>
            <span className="font-medium">{specimen.testOrdered}</span>
            <span className="text-muted-foreground">Container</span>
            <span>{specimen.containerType}</span>
            <span className="text-muted-foreground">Transport</span>
            <span>{specimen.transportCondition}</span>
            <span className="text-muted-foreground">Accession #</span>
            <span className="font-mono">{specimen.accessionNumber}</span>
          </div>
        </section>

        {/* Lab Notes */}
        {specimen.labNotes && (
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Lab Notes</h3>
            <p className="text-sm bg-muted/50 rounded-md p-3">{specimen.labNotes}</p>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
