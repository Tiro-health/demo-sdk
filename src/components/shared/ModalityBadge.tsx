import { Badge } from '@/components/ui/badge';
import type { Modality } from '@/types/study';

const modalityColors: Record<Modality, string> = {
  XA: 'badge-tone-info',
  DX: 'badge-tone-success',
  PT: 'badge-tone-violet',
  NM: 'badge-tone-emphasis',
  MG: 'badge-tone-rose',
  CR: 'badge-tone-cyan',
  MR: 'badge-tone-violet',
  CT: 'badge-tone-rose',
};

interface ModalityBadgeProps {
  modality: Modality;
}

export function ModalityBadge({ modality }: ModalityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${modalityColors[modality]} font-semibold`}
    >
      {modality}
    </Badge>
  );
}
