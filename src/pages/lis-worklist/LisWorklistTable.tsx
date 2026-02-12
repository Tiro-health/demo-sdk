import { LisTableHeader } from '@/components/shared/LisTableHeader';
import { SpecimenRow } from '@/components/shared/SpecimenRow';
import type { Specimen } from '@/types/specimen';
import type { LisSearchParams } from '@/types/lis-search-params';

type SortKey = 'collectionDateTime' | 'patientName' | 'specimenType' | 'testOrdered' | 'status';

interface Props {
  specimens: Specimen[];
  searchParams: LisSearchParams;
  onSpecimenClick: (specimenId: string) => void;
  onSortChange: (params: Partial<LisSearchParams>) => void;
}

export function LisWorklistTable({ specimens, searchParams, onSpecimenClick, onSortChange }: Props) {
  const sortConfig = {
    key: (searchParams.sortBy || 'collectionDateTime') as SortKey,
    direction: (searchParams.sortDir || 'desc') as 'asc' | 'desc',
  };

  const handleSort = (key: SortKey) => {
    const newDir = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ sortBy: key, sortDir: newDir });
  };

  return (
    <div className="worklist-table-shell worklist-table-shell-lis">
      <LisTableHeader sortConfig={sortConfig} onSort={handleSort} />
      {specimens.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">No specimens found</p>
        </div>
      ) : (
        <div className="p-2 md:p-3 space-y-2">
          {specimens.map((specimen) => (
            <SpecimenRow
              key={specimen.id}
              specimen={specimen}
              isSelected={false}
              onClick={(s) => onSpecimenClick(s.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
