import { Link } from '@tanstack/react-router';
import { useTheme } from '@/hooks/useTheme';
import { DEMO_LIST } from '@/lib/demoRegistry';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function HomePage() {
  useTheme('light');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Tiro.health Demo Platform</h1>
        <p className="text-muted-foreground mt-2">Select a demo to explore</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {DEMO_LIST.map((demo) => (
          <Link key={demo.id} to={demo.basePath} className="no-underline">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-2 hover:border-primary/30">
              <CardHeader>
                <demo.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{demo.shortTitle}</CardTitle>
                <CardDescription>{demo.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{demo.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
