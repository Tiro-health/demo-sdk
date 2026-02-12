import { Activity, FlaskConical, type LucideIcon } from 'lucide-react';

export type DemoType = 'pacs' | 'lis';

export interface DemoConfig {
  id: DemoType;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  theme: 'dark' | 'light';
  basePath: string;
  defaultTemplateUrl: string;
  tiroLabel: string;
}

export const DEMO_CONFIGS: Record<DemoType, DemoConfig> = {
  pacs: {
    id: 'pacs',
    title: 'Radiology Worklist',
    shortTitle: 'PACS',
    description: 'DICOM imaging worklist with modality filters, study details, and radiology reporting.',
    icon: Activity,
    theme: 'dark',
    basePath: '/pacs',
    defaultTemplateUrl: 'http://templates.tiro.health/templates/aa87c115c40149e98faba070cacb15c9',
    tiroLabel: 'Tiro.health Radiology Demo',
  },
  lis: {
    id: 'lis',
    title: 'Pathology Worklist',
    shortTitle: 'LIS',
    description: 'Pathology specimen tracking focused on biopsy and resection workflows.',
    icon: FlaskConical,
    theme: 'light',
    basePath: '/lis',
    defaultTemplateUrl: 'http://templates.tiro.health/templates/02d4f566b5204b2ba743128bcd0e2715',
    tiroLabel: 'Tiro.health Pathology Demo',
  },
};

export const DEMO_LIST = Object.values(DEMO_CONFIGS);
