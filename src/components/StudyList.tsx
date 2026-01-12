import { Study } from '@/types/study';
import { StudyRow } from '@/components/shared/StudyRow';

interface StudyListProps {
  studies: Study[];
  selectedStudyId: string | null;
  onStudyClick: (study: Study) => void;
}

export function StudyList({ studies, selectedStudyId, onStudyClick }: StudyListProps) {
  if (studies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No studies found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {studies.map((study) => (
        <StudyRow
          key={study.id}
          study={study}
          isSelected={study.id === selectedStudyId}
          onClick={onStudyClick}
        />
      ))}
    </div>
  );
}
