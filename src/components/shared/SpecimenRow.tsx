import type { Specimen } from '@/types/specimen';
import { SpecimenTypeBadge } from '@/components/shared/SpecimenTypeBadge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PriorityBadge } from '@/components/shared/PriorityBadge';
import { cn } from '@/lib/utils';

interface SpecimenRowProps {
  specimen: Specimen;
  isSelected: boolean;
  onClick: (specimen: Specimen) => void;
}

export function SpecimenRow({ specimen, isSelected, onClick }: SpecimenRowProps) {
  const patientName = `${specimen.patient.lastName}, ${specimen.patient.firstName}`;

  return (
    <button
      onClick={() => onClick(specimen)}
      className={cn(
        'worklist-row w-full p-3 grid grid-cols-12 gap-3 items-center text-left',
        isSelected && 'ring-2 ring-primary'
      )}
      aria-selected={isSelected}
    >
      {/* Collection Date/Time - cols 1-2 */}
      <div className="col-span-2 space-y-0.5">
        <div className="text-sm font-medium">{specimen.collectionDate}</div>
        <div className="text-xs text-muted-foreground">{specimen.collectionTime}</div>
      </div>

      {/* Patient - cols 3-4 */}
      <div className="col-span-2">
        <div className="text-sm font-medium">{patientName}</div>
      </div>

      {/* Specimen Type - col 5 */}
      <div className="col-span-1">
        <SpecimenTypeBadge specimenType={specimen.specimenType} />
      </div>

      {/* Test Ordered - cols 6-7 */}
      <div className="col-span-2">
        <div className="text-sm">{specimen.testOrdered}</div>
      </div>

      {/* Priority - col 8 */}
      <div className="col-span-1">
        <PriorityBadge priority={specimen.priority} />
      </div>

      {/* Status - col 9 */}
      <div className="col-span-1">
        <StatusBadge status={specimen.status} />
      </div>

      {/* Accession Number - cols 10-12 */}
      <div className="col-span-3">
        <div className="text-sm font-mono text-muted-foreground">{specimen.accessionNumber}</div>
      </div>
    </button>
  );
}
