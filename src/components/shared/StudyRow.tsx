import { Study } from '@/types/study';
import { ModalityBadge } from '@/components/shared/ModalityBadge';
import { cn } from '@/lib/utils';

interface StudyRowProps {
  study: Study;
  isSelected: boolean;
  onClick: (study: Study) => void;
}

export function StudyRow({ study, isSelected, onClick }: StudyRowProps) {
  const patientName = `${study.patient.lastName}, ${study.patient.firstName}`;
  const patientDemographics = `${study.patient.gender} • ${study.patient.dateOfBirth}`;

  return (
    <button
      onClick={() => onClick(study)}
      className={cn(
        'study-row w-full p-3 grid grid-cols-12 gap-4 items-center text-left',
        isSelected && 'study-row-selected'
      )}
      aria-selected={isSelected}
    >
      {/* Date/Time - cols 1-2 */}
      <div className="col-span-2 space-y-0.5">
        <div className="text-sm font-medium">{study.studyDate}</div>
        <div className="text-xs text-muted-foreground">{study.studyTime}</div>
      </div>

      {/* Patient - cols 3-4 */}
      <div className="col-span-2 space-y-0.5">
        <div className="text-sm font-medium">{patientName}</div>
        <div className="text-xs text-muted-foreground">{patientDemographics}</div>
      </div>

      {/* Modality - col 5 */}
      <div className="col-span-1">
        <ModalityBadge modality={study.modality} />
      </div>

      {/* Study Description - cols 6-7 */}
      <div className="col-span-2">
        <div className="text-sm line-clamp-2">{study.studyDescription}</div>
      </div>

      {/* Research Question - cols 8-12 */}
      <div className="col-span-5">
        <div className="text-sm text-muted-foreground line-clamp-2">
          {study.researchQuestion}
        </div>
      </div>
    </button>
  );
}
