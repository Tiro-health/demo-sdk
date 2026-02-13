import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEMO_CONFIGS, type DemoType } from '@/lib/demoRegistry';
import { useClinician } from '@/hooks/useClinician';
import type { ReactNode } from 'react';

interface DemoHeaderProps {
  demoType: DemoType;
  contextInfo?: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
}

export function DemoHeader({ demoType, contextInfo, showBackButton, backTo }: DemoHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const config = DEMO_CONFIGS[demoType];
  const Icon = config.icon;
  const demoEntries = Object.values(DEMO_CONFIGS);
  const { clinicianName, setClinicianName, options } = useClinician();
  const clinicianInitials = clinicianName
    .replace(/^dr\.\s*/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="header-blur sticky top-0 z-50 border-b border-border/25 bg-background/88 backdrop-blur supports-[backdrop-filter]:bg-background/74">
      <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center gap-4 px-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" size="sm" asChild>
              <Link to={backTo || config.basePath}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Switch application"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
            >
              <Icon className="h-6 w-6 text-primary" />
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {isMenuOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-border/35 bg-card/98 shadow-[0_10px_24px_rgba(0,0,0,0.14)] z-50 p-1"
                role="menu"
              >
                {demoEntries.map((entry) => {
                  const EntryIcon = entry.icon;
                  const isCurrentDemo = entry.id === demoType;
                  return isCurrentDemo ? (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded-sm px-2 py-1.5 text-sm text-muted-foreground"
                      role="menuitem"
                    >
                      <span className="flex items-center gap-2">
                        <EntryIcon className="h-4 w-4" />
                        {entry.title}
                      </span>
                      <Check className="h-4 w-4" />
                    </div>
                  ) : (
                    <Link
                      key={entry.id}
                      to={entry.basePath}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                      role="menuitem"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <EntryIcon className="h-4 w-4 text-primary" />
                      {entry.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold">{config.title}</h1>
            <p className="text-xs text-muted-foreground">{config.tiroLabel}</p>
          </div>
        </div>
        <div className="justify-self-end">
          {contextInfo && <div className="mr-3 inline-flex items-center align-middle">{contextInfo}</div>}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-background/55 px-2 py-0.5 align-middle">
            <div className="relative h-7 w-7 shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary/85">
                {clinicianInitials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-background bg-emerald-500/90" />
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-[9px] uppercase tracking-wide text-muted-foreground/80">Logged in</p>
            </div>
            <Select value={clinicianName} onValueChange={setClinicianName}>
              <SelectTrigger className="h-8 w-[165px] border-0 bg-transparent px-1.5 text-sm font-medium text-foreground/90 shadow-none focus:ring-0 focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border/35 bg-card/98 shadow-lg">
                {options.map((name) => (
                  <SelectItem key={name} value={name} className="focus:bg-accent">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}
