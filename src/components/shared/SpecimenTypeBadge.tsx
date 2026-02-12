import { Badge } from '@/components/ui/badge';
import type { SpecimenType } from '@/types/specimen';

const specimenColors: Record<SpecimenType, string> = {
  Biopsy: 'badge-tone-info',
  Resection: 'badge-tone-success',
  Curettage: 'badge-tone-emphasis',
  'Cell Block': 'badge-tone-violet',
  'Frozen Section': 'badge-tone-rose',
};

interface SpecimenTypeBadgeProps {
  specimenType: SpecimenType;
}

export function SpecimenTypeBadge({ specimenType }: SpecimenTypeBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${specimenColors[specimenType]} font-semibold`}
    >
      {specimenType}
    </Badge>
  );
}
