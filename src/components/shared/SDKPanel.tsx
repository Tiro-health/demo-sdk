import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function SDKPanel() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Tiro.health SDK</CardTitle>
        <CardDescription>AI Documentation Assistant</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <iframe
          src="/launch.html"
          className="sdk-iframe flex-1"
          title="Tiro.health SDK"
          allow="clipboard-read; clipboard-write"
        />
      </CardContent>
    </Card>
  );
}
