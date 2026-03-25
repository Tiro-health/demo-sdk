import { useLanguage } from './useLanguage';
import { t, type TranslationKey } from '@/lib/i18n';

export function useTranslation() {
  const { language, setLanguage, options } = useLanguage();

  return {
    t: (key: TranslationKey) => t(key, language),
    language,
    setLanguage,
    languageOptions: options,
  };
}
