import { useState, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Trash2, RefreshCw, Plus, Copy } from "lucide-react";

interface ParameterFormProps {
  initialParams: Record<string, string>;
}

export function ParameterForm({ initialParams }: ParameterFormProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [params, setParams] = useState<Record<string, string>>(initialParams);

  const launchUrl = useMemo(() => {
    const searchParams = new URLSearchParams(params);
    return `/launch.html?${searchParams.toString()}`;
  }, [params]);

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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Reporting</CardTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const fullUrl = window.location.origin + launchUrl;
                navigator.clipboard.writeText(fullUrl);
              }}
              className="cursor-pointer"
              title="Copy URL"
            >
              <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={() =>
                iframeRef.current?.contentWindow?.location.reload()
              }
              className="cursor-pointer"
              title="Refresh iframe"
            >
              <RefreshCw className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
            <details className="relative">
              <summary className="cursor-pointer list-none">
                <Settings className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </summary>
              <div className="absolute right-0 mt-2 p-3 bg-card border rounded-md shadow-lg z-10 min-w-70">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  URL Parameters
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

                  {/* New param input row */}
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
                      className="text-muted-foreground hover:text-gray-300 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </details>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <iframe
          ref={iframeRef}
          src={launchUrl}
          className="flex-1 rounded-md border-0"
          title="Tiro.health SDK"
          allow="clipboard-read; clipboard-write"
        />
      </CardContent>
    </Card>
  );
}
