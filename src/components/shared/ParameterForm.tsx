import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Trash2, RefreshCw, Plus, Copy, Maximize2, Minimize2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { usePictureInPicture } from "@/hooks/usePictureInPicture";

interface TemplateOption {
  id: string;
  label: string;
  questionnaire?: string;
  inlineQuestionnaire?: string;
}

interface ParameterFormProps {
  initialParams: Record<string, string>;
  panelTone?: 'light' | 'dark';
  showTemplatePicker?: boolean;
  templateOptions?: TemplateOption[];
}

export function ParameterForm({
  initialParams,
  panelTone = 'light',
  showTemplatePicker = false,
  templateOptions = [],
}: ParameterFormProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t, language } = useTranslation();
  const [params, setParams] = useState<Record<string, string>>(initialParams);
  const [refreshKey, setRefreshKey] = useState(0);
  const { pipWindow, isPipOpen, openPip, closePip } = usePictureInPicture({ width: 430, height: 680 });

  const handleRefresh = useCallback(() => {
    if (isPipOpen) {
      setRefreshKey((k) => k + 1);
    } else {
      iframeRef.current?.contentWindow?.location.reload();
    }
  }, [isPipOpen]);
  const effectiveTemplateOptions = useMemo(
    () =>
      templateOptions.length > 0
        ? templateOptions
        : [{
            id: "default",
            label: "Default template",
            questionnaire: initialParams.questionnaire || "",
          }],
    [templateOptions, initialParams.questionnaire]
  );
  const [templatePreset, setTemplatePreset] = useState<string>(
    initialParams.templatePreset || effectiveTemplateOptions[0].id
  );

  useEffect(() => {
    setParams((prev) => {
      const next = { ...initialParams };
      if (prev.templatePreset) next.templatePreset = prev.templatePreset;
      if (prev.questionnaire) next.questionnaire = prev.questionnaire;
      if (prev.inlineQuestionnaire) {
        next.inlineQuestionnaire = prev.inlineQuestionnaire;
        delete next.questionnaire;
      }
      return next;
    });
  }, [initialParams]);

  const launchUrl = useMemo(() => {
    const searchParams = new URLSearchParams({ ...params, language });
    return `/launch.html?${searchParams.toString()}`;
  }, [params, language]);

  const applyTemplatePreset = (preset: string) => {
    const selectedTemplate = effectiveTemplateOptions.find((item) => item.id === preset);
    if (!selectedTemplate) return;

    setParams((prev) => {
      const next: Record<string, string> = { ...prev, templatePreset: preset };
      if (selectedTemplate.inlineQuestionnaire) {
        next.inlineQuestionnaire = selectedTemplate.inlineQuestionnaire;
        delete next.questionnaire;
      } else if (selectedTemplate.questionnaire) {
        next.questionnaire = selectedTemplate.questionnaire;
        delete next.inlineQuestionnaire;
      }
      return next;
    });
  };

  const deleteParam = (key: string) => {
    setParams((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleNewParamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const formData = new FormData(formElem);
    const key = formData.get("key")?.toString().trim() || "";
    const value = formData.get("value")?.toString() || "";
    if (key && !(key in params)) {
      setParams((prev) => ({ ...prev, [key]: value }));
      formElem.reset();
      formElem.key.focus();
    }
  };

  const headerControls = (inPip = false) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          const fullUrl = window.location.origin + launchUrl;
          navigator.clipboard.writeText(fullUrl);
        }}
        className="cursor-pointer"
        title={t('copyUrl')}
      >
        <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      </button>
      <button
        onClick={handleRefresh}
        className="cursor-pointer"
        title={t('refreshIframe')}
      >
        <RefreshCw className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      </button>
      <details className="relative">
        <summary className="cursor-pointer list-none">
          <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </summary>
        <div className="absolute right-0 mt-2 p-3 bg-card border rounded-md shadow-lg z-10 min-w-70">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {t('urlParameters')}
          </p>
          <div className="space-y-1.5">
            {Object.entries(params).map(([key, value]) => (
              <div key={key} className="flex gap-2 items-center">
                <span className="flex-1 text-xs text-muted-foreground truncate">
                  {key}
                </span>
                <span className="flex-1 text-xs font-mono truncate">
                  {value}
                </span>
                <button
                  onClick={() => deleteParam(key)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <form
              className="flex gap-2 items-center pt-1 border-t border-border"
              onSubmit={handleNewParamSubmit}
            >
              <input
                name="key"
                type="text"
                placeholder="key"
                className="flex-1 text-xs bg-transparent border border-border rounded px-1.5 py-1 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                name="value"
                type="text"
                placeholder="value"
                className="flex-1 text-xs bg-transparent border border-border rounded px-1.5 py-1 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </details>
      {!inPip && (
        <button
          onClick={isPipOpen ? closePip : openPip}
          className="cursor-pointer"
          title={isPipOpen ? 'Return to panel' : 'Pop out to floating window'}
        >
          {isPipOpen ? (
            <Minimize2 className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          ) : (
            <Maximize2 className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          )}
        </button>
      )}
    </div>
  );

  return (
    <>
      <Card className={`h-full flex flex-col ${panelTone === 'dark' ? 'bg-[#050A18]' : 'bg-[#FAFAFA]'}`}>
        <CardHeader className="pb-2">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="justify-self-start">
              <CardTitle className="text-lg">{t('reporting')}</CardTitle>
            </div>
            <div className="justify-self-center">
              {showTemplatePicker && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {t('template')}
                  </span>
                  <Select
                    value={templatePreset}
                    onValueChange={(value) => {
                      setTemplatePreset(value);
                      applyTemplatePreset(value);
                    }}
                  >
                    <SelectTrigger
                      className={`h-8 w-[220px] shadow-none ${
                        panelTone === 'dark'
                          ? 'bg-white/5 border-white/12 text-slate-100 focus:ring-0 focus-visible:ring-0'
                          : 'bg-white/70 border-black/10 text-slate-800 focus:ring-0 focus-visible:ring-0'
                      }`}
                    >
                      <SelectValue placeholder={t('selectTemplate')} />
                    </SelectTrigger>
                    <SelectContent
                      className={`shadow-xl ${
                        panelTone === 'dark'
                          ? 'bg-[#0E1630] border-white/12 text-slate-100'
                          : 'bg-white border-black/10 text-slate-800'
                      }`}
                    >
                      {effectiveTemplateOptions.map((templateOption) => (
                        <SelectItem
                          key={templateOption.id}
                          value={templateOption.id}
                          className={panelTone === 'dark' ? 'focus:bg-white/10 focus:text-slate-100' : 'focus:bg-slate-100'}
                        >
                          {templateOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="justify-self-end">
              {headerControls()}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          {isPipOpen ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-white/15 text-center px-6">
              <Maximize2 className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Reporting panel is open in a floating window
              </p>
              <button
                onClick={closePip}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors cursor-pointer"
              >
                Return to panel
              </button>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={launchUrl}
              className="flex-1 rounded-md border-0"
              title="Tiro.health SDK"
              allow="clipboard-read; clipboard-write"
            />
          )}
        </CardContent>
      </Card>

      {isPipOpen && pipWindow &&
        createPortal(
          <div
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              padding: '8px',
              boxSizing: 'border-box',
              backgroundColor: panelTone === 'dark' ? '#050A18' : '#FAFAFA',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontWeight: 600,
                  fontSize: '15px',
                  color: panelTone === 'dark' ? '#f1f5f9' : '#1e293b',
                }}
              >
                {t('reporting')}
              </span>
              <button
                onClick={closePip}
                title="Return to panel"
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  color: panelTone === 'dark' ? '#94a3b8' : '#64748b',
                }}
              >
                <Minimize2 style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <iframe
              key={refreshKey}
              src={launchUrl}
              style={{ flex: 1, border: 'none', borderRadius: '6px' }}
              title="Tiro.health SDK"
              allow="clipboard-read; clipboard-write"
            />
          </div>,
          pipWindow.document.body,
        )
      }
    </>
  );
}
