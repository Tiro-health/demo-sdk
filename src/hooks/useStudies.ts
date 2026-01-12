import { useMemo } from 'react';
import { generateStudies } from '@/lib/mockData';
import { Study } from '@/types/study';

// Generate once and cache in module scope
let cachedStudies: Study[] | null = null;

export function useStudies() {
  const studies = useMemo(() => {
    if (!cachedStudies) {
      cachedStudies = generateStudies(40);
    }
    return cachedStudies;
  }, []);

  return studies;
}

export function useStudyById(studyId: string | undefined): Study | undefined {
  const studies = useStudies();
  return useMemo(
    () => studies.find((s) => s.id === studyId),
    [studies, studyId]
  );
}
