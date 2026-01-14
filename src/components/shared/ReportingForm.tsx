import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Trash2, RefreshCw } from 'lucide-react';
import type { Study } from '@/types/study';

interface ReportingFormProps {
  study: Study;
}

function generatePatientId(study: Study): string {
  const dob = study.patient.dateOfBirth.replace(/-/g, '');
  const lastName = study.patient.lastName.substring(0, 3).toUpperCase();
  return `${dob}-${lastName}`;
}

export function ReportingForm({ study }: ReportingFormProps) {
  const patientId = generatePatientId(study);
  const [customParams, setCustomParams] = useState<Array<{ key: string; value: string }>>([]);
  const [newParam, setNewParam] = useState({ key: '', value: '' });
  const [iframeKey, setIframeKey] = useState(0);

  const launchUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('patientId', patientId);
    params.set('accessionNumber', study.accessionNumber);
    customParams.forEach(({ key, value }) => {
      if (key) params.set(key, value);
    });
    return `/launch.html?${params.toString()}`;
  }, [patientId, study.accessionNumber, customParams]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newParam.key.trim()) {
      setCustomParams((prev) => [...prev, { key: newParam.key.trim(), value: newParam.value }]);
      setNewParam({ key: '', value: '' });
    }
  };

  const deleteParam = (index: number) => {
    setCustomParams((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Reporting</CardTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIframeKey((k) => k + 1)}
              className="cursor-pointer"
              title="Refresh iframe"
            >
              <RefreshCw className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
            <details className="relative">
            <summary className="cursor-pointer list-none">
              <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </summary>
            <div className="absolute right-0 mt-2 p-3 bg-card border rounded-md shadow-lg z-10 min-w-[280px]">
              <p className="text-xs font-medium text-muted-foreground mb-2">iframe URL Parameters</p>
              <div className="space-y-1.5">
                {/* Base params (read-only) */}
                <div className="flex gap-2 text-xs items-center">
                  <span className="flex-1 text-muted-foreground truncate">patientId</span>
                  <span className="flex-1 font-mono truncate">{patientId}</span>
                  <div className="w-5" />
                </div>
                <div className="flex gap-2 text-xs items-center">
                  <span className="flex-1 text-muted-foreground truncate">accessionNumber</span>
                  <span className="flex-1 font-mono truncate">{study.accessionNumber}</span>
                  <div className="w-5" />
                </div>

                {/* Custom params with delete */}
                {customParams.map((param, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span className="flex-1 text-xs text-muted-foreground truncate">{param.key}</span>
                    <span className="flex-1 text-xs font-mono truncate">{param.value}</span>
                    <button
                      onClick={() => deleteParam(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                {/* New param input row */}
                <div className="flex gap-2 items-center pt-1 border-t border-border">
                  <input
                    type="text"
                    placeholder="key"
                    value={newParam.key}
                    onChange={(e) => setNewParam((p) => ({ ...p, key: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className="flex-1 text-xs bg-transparent border border-border rounded px-1.5 py-1 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <input
                    type="text"
                    placeholder="value"
                    value={newParam.value}
                    onChange={(e) => setNewParam((p) => ({ ...p, value: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className="flex-1 text-xs bg-transparent border border-border rounded px-1.5 py-1 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <div className="w-5" />
                </div>
              </div>
            </div>
            </details>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <iframe
          key={iframeKey}
          src={launchUrl}
          className="flex-1 rounded-md border-0"
          title="Tiro.health SDK"
          allow="clipboard-read; clipboard-write"
        />
      </CardContent>
    </Card>
  );
}
