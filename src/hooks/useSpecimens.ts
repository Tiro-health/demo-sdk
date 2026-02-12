import { useMemo } from 'react';
import { generateSpecimens } from '@/lib/mockSpecimenData';
import type { Specimen } from '@/types/specimen';

let cachedSpecimens: Specimen[] | null = null;

export function useSpecimens() {
  return useMemo(() => {
    if (!cachedSpecimens) {
      cachedSpecimens = generateSpecimens(40);
    }
    return cachedSpecimens;
  }, []);
}

export function useSpecimenById(specimenId: string | undefined): Specimen | undefined {
  const specimens = useSpecimens();
  return useMemo(
    () => specimens.find((s) => s.id === specimenId),
    [specimens, specimenId],
  );
}
