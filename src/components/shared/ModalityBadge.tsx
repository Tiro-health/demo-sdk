import { Badge } from '@/components/ui/badge';
import type { Modality } from '@/types/study';

const modalityColors: Record<Modality, string> = {
  XA: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  DX: 'bg-green-500/20 text-green-300 border-green-500/50',
  PT: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
  NM: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  MG: 'bg-pink-500/20 text-pink-300 border-pink-500/50',
  CR: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
  MR: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
  CT: 'bg-red-500/20 text-red-300 border-red-500/50',
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
