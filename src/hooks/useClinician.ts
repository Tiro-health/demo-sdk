import { useSyncExternalStore } from 'react';

const CLINICIAN_STORAGE_KEY = 'demo:selected-clinician';
const CLINICIAN_EVENT = 'demo:clinician-changed';
const DEFAULT_CLINICIAN = 'dr. Peeters';

export const CLINICIAN_OPTIONS = [
  'dr. Peeters',
  'dr. Janssens',
  'dr. Van Damme',
  'dr. Vermeulen',
] as const;

function getStoredClinician(): string {
  if (typeof window === 'undefined') return DEFAULT_CLINICIAN;
  const stored = window.localStorage.getItem(CLINICIAN_STORAGE_KEY);
  return stored || DEFAULT_CLINICIAN;
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const onStorage = (event: StorageEvent) => {
    if (event.key === CLINICIAN_STORAGE_KEY) onStoreChange();
  };
  const onCustom = () => onStoreChange();

  window.addEventListener('storage', onStorage);
  window.addEventListener(CLINICIAN_EVENT, onCustom);

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CLINICIAN_EVENT, onCustom);
  };
}

export function setSelectedClinician(clinicianName: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CLINICIAN_STORAGE_KEY, clinicianName);
  window.dispatchEvent(new Event(CLINICIAN_EVENT));
}

export function useClinician() {
  const clinicianName = useSyncExternalStore(subscribe, getStoredClinician, () => DEFAULT_CLINICIAN);

  return {
    clinicianName,
    setClinicianName: setSelectedClinician,
    options: CLINICIAN_OPTIONS,
  };
}

