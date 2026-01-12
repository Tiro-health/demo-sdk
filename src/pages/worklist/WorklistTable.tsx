import { TableHeader } from '@/components/shared/TableHeader';
import { StudyList } from '@/components/StudyList';
import { Study, SortConfig } from '@/types/study';
import { WorklistSearchParams } from '@/types/search-params';

interface Props {
  studies: Study[];
  searchParams: WorklistSearchParams;
  onStudyClick: (studyId: string) => void;
  onSortChange: (params: Partial<WorklistSearchParams>) => void;
}

export function WorklistTable({ studies, searchParams, onStudyClick, onSortChange }: Props) {
  const sortConfig: SortConfig = {
    key: searchParams.sortBy || 'dateTime',
    direction: searchParams.sortDir || 'desc',
  };

  const handleSort = (key: SortConfig['key']) => {
    const newDir = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ sortBy: key, sortDir: newDir });
  };

  return (
    <>
      <TableHeader sortConfig={sortConfig} onSort={handleSort} />
      <StudyList
        studies={studies}
        selectedStudyId={null}
        onStudyClick={(study) => onStudyClick(study.id)}
      />
    </>
  );
}
