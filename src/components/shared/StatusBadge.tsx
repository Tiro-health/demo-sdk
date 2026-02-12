import { Badge } from '@/components/ui/badge';
import type { LabStatus } from '@/types/specimen';

const statusColors: Record<LabStatus, string> = {
  Received: 'badge-tone-info',
  'In Progress': 'badge-tone-emphasis',
  Completed: 'badge-tone-success',
  Pending: 'badge-tone-neutral',
};

interface StatusBadgeProps {
  status: LabStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${statusColors[status]} font-semibold`}
    >
      {status}
    </Badge>
  );
}
