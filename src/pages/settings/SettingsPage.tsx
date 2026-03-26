import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { DEMO_LIST, type DemoType } from '@/lib/demoRegistry';
import { TEMPLATE_REGISTRY, type TemplateDefinition } from '@/lib/templateRegistry';
import {
  useTemplateSettings,
  setDemoTemplateDefault,
  toggleDemoTemplate,
  resetDemoTemplateSettings,
} from '@/hooks/useTemplateSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function TemplateRow({
  template,
  demoType,
  isEnabled,
  isDefault,
  isOnlyEnabled,
}: {
  template: TemplateDefinition;
  demoType: DemoType;
  isEnabled: boolean;
  isDefault: boolean;
  isOnlyEnabled: boolean;
}) {
  const url = template.questionnaire ?? template.inlineQuestionnaire ?? '';
  const isInline = !template.questionnaire;

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors ${
        isEnabled ? 'border-border/60 bg-white' : 'border-border/30 bg-slate-50 opacity-60'
      }`}
    >
      {/* Enable/disable toggle */}
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={isEnabled}
          disabled={isEnabled && isOnlyEnabled}
          onChange={(e) => toggleDemoTemplate(demoType, template.id, e.target.checked)}
        />
        <div
          className={`h-5 w-9 rounded-full transition-colors ${
            isEnabled ? 'bg-primary' : 'bg-slate-200'
          } ${isEnabled && isOnlyEnabled ? 'opacity-50' : ''}`}
        />
        <div
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            isEnabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </label>

      {/* Default radio */}
      <label className="flex cursor-pointer items-center">
        <input
          type="radio"
          className="sr-only"
          checked={isDefault}
          disabled={!isEnabled}
          onChange={() => setDemoTemplateDefault(demoType, template.id)}
        />
        <div
          className={`h-4 w-4 rounded-full border-2 transition-colors ${
            isDefault
              ? 'border-primary bg-primary'
              : isEnabled
              ? 'border-slate-300 bg-white'
              : 'border-slate-200 bg-white'
          } flex items-center justify-center`}
        >
          {isDefault && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
        </div>
      </label>

      {/* Label & URL */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-800">{template.label}</span>
          {isDefault && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              default
            </span>
          )}
          {isInline && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              inline
            </span>
          )}
        </div>
        {url && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground" title={url}>
            {url}
          </p>
        )}
      </div>
    </div>
  );
}

function DemoTemplateSettings({ demoType }: { demoType: DemoType }) {
  const { enabledTemplates, defaultTemplateId } = useTemplateSettings(demoType);
  const allTemplates = TEMPLATE_REGISTRY[demoType];

  return (
    <div className="space-y-2">
      <div className="mb-3 flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span className="w-9 text-center">On</span>
        <span className="w-4 text-center">★</span>
        <span>Template</span>
      </div>
      {allTemplates.map((template) => (
        <TemplateRow
          key={template.id}
          template={template}
          demoType={demoType}
          isEnabled={enabledTemplates.some((t) => t.id === template.id)}
          isDefault={defaultTemplateId === template.id}
          isOnlyEnabled={enabledTemplates.length === 1 && enabledTemplates[0].id === template.id}
        />
      ))}
    </div>
  );
}

export function SettingsPage() {
  useTheme('light');
  const [activeTab, setActiveTab] = useState<DemoType>('pacs');

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-border/25 bg-white/90 backdrop-blur">
        <div className="flex h-14 items-center gap-4 px-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/${activeTab}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-base font-semibold text-slate-800">Demo Settings</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Template visibility</CardTitle>
            <p className="text-sm text-muted-foreground">
              Control which templates appear in each demo and which one loads by default.
            </p>
          </CardHeader>
          <CardContent>
            {/* Tabs */}
            <div className="mb-6 flex gap-1 rounded-lg bg-slate-100 p-1">
              {DEMO_LIST.map((demo) => {
                const Icon = demo.icon;
                return (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => setActiveTab(demo.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === demo.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {demo.shortTitle}
                  </button>
                );
              })}
            </div>

            {/* Template list */}
            <DemoTemplateSettings demoType={activeTab} />

            {/* Reset */}
            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => resetDemoTemplateSettings(activeTab)}
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Reset to defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
