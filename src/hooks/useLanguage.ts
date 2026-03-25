import { useSyncExternalStore } from 'react';

export type Language = 'en' | 'nl' | 'fr';

const LANGUAGE_STORAGE_KEY = 'demo:selected-language';
const LANGUAGE_EVENT = 'demo:language-changed';
const DEFAULT_LANGUAGE: Language = 'nl';

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'nl', label: 'NL' },
  { value: 'fr', label: 'FR' },
];

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'en' || stored === 'nl' || stored === 'fr') return stored;
  return DEFAULT_LANGUAGE;
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const onStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) onStoreChange();
  };
  const onCustom = () => onStoreChange();

  window.addEventListener('storage', onStorage);
  window.addEventListener(LANGUAGE_EVENT, onCustom);

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(LANGUAGE_EVENT, onCustom);
  };
}

export function setSelectedLanguage(language: Language): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  window.dispatchEvent(new Event(LANGUAGE_EVENT));
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getStoredLanguage, () => DEFAULT_LANGUAGE);

  return {
    language,
    setLanguage: setSelectedLanguage,
    options: LANGUAGE_OPTIONS,
  };
}
