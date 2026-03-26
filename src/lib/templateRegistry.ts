import type { DemoType } from '@/lib/demoRegistry';

export interface TemplateDefinition {
  id: string;
  label: string;
  questionnaire?: string;
  inlineQuestionnaire?: string;
}

export const TEMPLATE_REGISTRY: Record<DemoType, TemplateDefinition[]> = {
  pacs: [
    { id: 'radiology', label: 'Radiology reporting', questionnaire: 'http://templates.tiro.health/templates/aa87c115c40149e98faba070cacb15c9' },
    { id: 'basic', label: 'Basic template', questionnaire: 'http://templates.tiro.health/templates/8d7ab478ce8b4dc3a84b7b33ab34b335' },
    { id: 'ct-coronarography', label: 'CT Coronarography', questionnaire: 'http://templates.tiro.health/templates/04cd8b41a7dc491f8fb006f66c60c958' },
    { id: 'advanced', label: 'Advanced template', questionnaire: 'http://templates.tiro.health/templates/b18e0a6605bb437e90d54f8ec65eeb1d' },
  ],
  lis: [
    { id: 'thyroid', label: 'Thyroid reporting', questionnaire: 'http://templates.tiro.health/templates/02d4f566b5204b2ba743128bcd0e2715' },
    { id: 'basic', label: 'Basic template', questionnaire: 'http://templates.tiro.health/templates/3640e41dba1e4318934e411a054cd721' },
    { id: 'advanced', label: 'Advanced template', questionnaire: 'http://templates.tiro.health/templates/b18e0a6605bb437e90d54f8ec65eeb1d' },
    { id: 'ovario', label: 'Cuestionario de Ovario', questionnaire: 'http://templates.tiro.health/templates/7aaacc5c2d5a48a38d40b3d2bb5afb64' },
    { id: 'er-pr-her2', label: 'ER/PR/HER2 rapportering', questionnaire: 'http://templates.tiro.health/templates/2ff90405d2bf4bbba8941b61d4881d78' },
    { id: 'mondholte', label: 'Mondholte tumoren', questionnaire: 'http://templates.tiro.health/templates/049555af4ddf4a74b7d2572f7000b12c' },
    { id: 'inline-basic', label: 'Inline basic template', inlineQuestionnaire: 'basic' },
  ],
  ehr: [
    { id: 'rarp', label: 'Operatieverslag RARP', questionnaire: 'http://templates.tiro.health/templates/11bc9b87d0744edb843ca6250ce24494' },
    { id: 'advanced', label: 'Advanced template', questionnaire: 'http://templates.tiro.health/templates/b18e0a6605bb437e90d54f8ec65eeb1d' },
  ],
};
