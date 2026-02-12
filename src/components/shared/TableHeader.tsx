import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SortConfig } from '@/types/study';

interface TableHeaderProps {
  sortConfig: SortConfig;
  onSort: (key: SortConfig['key']) => void;
}

export function TableHeader({ sortConfig, onSort }: TableHeaderProps) {
  const getSortIcon = (key: SortConfig['key']) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border/35 bg-muted/25 rounded-t-xl">
      {/* Date/Time - cols 1-2 */}
      <div className="col-span-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSort('dateTime')}
          className={`h-8 px-2 text-xs font-semibold ${
            sortConfig.key === 'dateTime' ? 'text-foreground bg-accent/60' : 'text-muted-foreground'
          }`}
        >
          Date/Time
          <span className="ml-1">{getSortIcon('dateTime')}</span>
        </Button>
      </div>

      {/* Patient - cols 3-4 */}
      <div className="col-span-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSort('patientName')}
          className={`h-8 px-2 text-xs font-semibold ${
            sortConfig.key === 'patientName' ? 'text-foreground bg-accent/60' : 'text-muted-foreground'
          }`}
        >
          Patient
          <span className="ml-1">{getSortIcon('patientName')}</span>
        </Button>
      </div>

      {/* Modality - col 5 */}
      <div className="col-span-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSort('modality')}
          className={`h-8 px-2 text-xs font-semibold ${
            sortConfig.key === 'modality' ? 'text-foreground bg-accent/60' : 'text-muted-foreground'
          }`}
        >
          Mod
          <span className="ml-1">{getSortIcon('modality')}</span>
        </Button>
      </div>

      {/* Study - cols 6-7 */}
      <div className="col-span-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2">Study</span>
      </div>

      {/* Research Question - cols 8-12 */}
      <div className="col-span-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2">Research Question</span>
      </div>
    </div>
  );
}
