import { useSyncExternalStore } from 'react';
import type { DemoType } from '@/lib/demoRegistry';
import { TEMPLATE_REGISTRY } from '@/lib/templateRegistry';

const SETTINGS_STORAGE_KEY = 'demo:template-settings';
const SETTINGS_EVENT = 'demo:template-settings-changed';

interface DemoTemplateSettings {
  defaultId: string;
  enabledIds: string[];
}

type TemplateSettings = Record<DemoType, DemoTemplateSettings>;

function getDefaultSettings(): TemplateSettings {
  return {
    pacs: { defaultId: TEMPLATE_REGISTRY.pacs[0].id, enabledIds: TEMPLATE_REGISTRY.pacs.map((t) => t.id) },
    lis:  { defaultId: TEMPLATE_REGISTRY.lis[0].id,  enabledIds: TEMPLATE_REGISTRY.lis.map((t) => t.id) },
    ehr:  { defaultId: TEMPLATE_REGISTRY.ehr[0].id,  enabledIds: TEMPLATE_REGISTRY.ehr.map((t) => t.id) },
  };
}

function getStoredSettings(): TemplateSettings {
  if (typeof window === 'undefined') return getDefaultSettings();
  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) return getDefaultSettings();
    const parsed = JSON.parse(stored) as Partial<TemplateSettings>;
    // Merge with defaults to handle newly added templates
    const defaults = getDefaultSettings();
    return {
      pacs: { ...defaults.pacs, ...parsed.pacs },
      lis:  { ...defaults.lis,  ...parsed.lis },
      ehr:  { ...defaults.ehr,  ...parsed.ehr },
    };
  } catch {
    return getDefaultSettings();
  }
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;
  const onStorage = (event: StorageEvent) => {
    if (event.key === SETTINGS_STORAGE_KEY) onStoreChange();
  };
  const onCustom = () => onStoreChange();
  window.addEventListener('storage', onStorage);
  window.addEventListener(SETTINGS_EVENT, onCustom);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(SETTINGS_EVENT, onCustom);
  };
}

function saveSettings(settings: TemplateSettings): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function setDemoTemplateDefault(demoType: DemoType, templateId: string): void {
  const settings = getStoredSettings();
  settings[demoType].defaultId = templateId;
  if (!settings[demoType].enabledIds.includes(templateId)) {
    settings[demoType].enabledIds.push(templateId);
  }
  saveSettings(settings);
}

export function toggleDemoTemplate(demoType: DemoType, templateId: string, enabled: boolean): void {
  const settings = getStoredSettings();
  const demo = settings[demoType];
  if (enabled) {
    if (!demo.enabledIds.includes(templateId)) {
      demo.enabledIds = [...demo.enabledIds, templateId];
    }
  } else {
    demo.enabledIds = demo.enabledIds.filter((id) => id !== templateId);
    // If the disabled template was the default, pick the first remaining enabled one
    if (demo.defaultId === templateId) {
      const remaining = TEMPLATE_REGISTRY[demoType].filter((t) => demo.enabledIds.includes(t.id));
      demo.defaultId = remaining[0]?.id ?? TEMPLATE_REGISTRY[demoType][0].id;
    }
  }
  saveSettings(settings);
}

export function resetDemoTemplateSettings(demoType: DemoType): void {
  const settings = getStoredSettings();
  const templates = TEMPLATE_REGISTRY[demoType];
  settings[demoType] = {
    defaultId: templates[0].id,
    enabledIds: templates.map((t) => t.id),
  };
  saveSettings(settings);
}

export function useTemplateSettings(demoType: DemoType) {
  const allSettings = useSyncExternalStore(subscribe, getStoredSettings, getDefaultSettings);
  const demoSettings = allSettings[demoType];
  const allTemplates = TEMPLATE_REGISTRY[demoType];

  const enabledTemplates = allTemplates.filter((t) => demoSettings.enabledIds.includes(t.id));
  const defaultTemplateId = demoSettings.defaultId;
  const defaultTemplate = allTemplates.find((t) => t.id === defaultTemplateId) ?? enabledTemplates[0];

  return { enabledTemplates, defaultTemplateId, defaultTemplate };
}
