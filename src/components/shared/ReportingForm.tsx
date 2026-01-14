import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, Trash2 } from 'lucide-react';
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
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddParam = () => {
    if (newKey.trim() && newValue.trim()) {
      setCustomParams([...customParams, { key: newKey.trim(), value: newValue.trim() }]);
      setNewKey('');
      setNewValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddParam();
    }
  };

  const handleDeleteParam = (index: number) => {
    setCustomParams(customParams.filter((_, i) => i !== index));
  };

  const baseParams = new URLSearchParams({
    patientId,
    accessionNumber: study.accessionNumber,
  });
  customParams.forEach(({ key, value }) => baseParams.set(key, value));
  const launchUrl = `/launch.html?${baseParams.toString()}`;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer list-none">
            <CardTitle className="text-lg">Reporting</CardTitle>
            <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-muted-foreground w-24">Patient ID:</span>
              <code className="bg-muted px-1 rounded">{patientId}</code>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground w-24">Accession:</span>
              <code className="bg-muted px-1 rounded">{study.accessionNumber}</code>
            </div>

            {customParams.map((param, index) => (
              <div key={index} className="flex items-center gap-2">
                <code className="bg-muted px-1 rounded w-24 truncate">{param.key}</code>
                <code className="bg-muted px-1 rounded flex-1 truncate">{param.value}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => handleDeleteParam(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}

            <div className="flex items-center gap-2 pt-2 border-t border-border mt-2">
              <Input
                placeholder="Key"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-7 text-xs w-24"
              />
              <Input
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-7 text-xs flex-1"
              />
            </div>
          </div>
        </details>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <iframe
          src={launchUrl}
          className="flex-1 rounded-md border-0"
          title="Tiro.health SDK"
          allow="clipboard-read; clipboard-write"
        />
      </CardContent>
    </Card>
  );
}
