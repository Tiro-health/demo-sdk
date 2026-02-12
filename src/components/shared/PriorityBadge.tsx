import { Badge } from '@/components/ui/badge';
import type { LabPriority } from '@/types/specimen';

const priorityColors: Record<LabPriority, string> = {
  Routine: 'badge-tone-neutral',
  Urgent: 'badge-tone-emphasis',
  STAT: 'badge-tone-rose',
};

interface PriorityBadgeProps {
  priority: LabPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${priorityColors[priority]} font-semibold`}
    >
      {priority}
    </Badge>
  );
}
