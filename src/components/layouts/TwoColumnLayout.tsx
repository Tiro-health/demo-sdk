import { ReactNode } from 'react';

interface TwoColumnLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export function TwoColumnLayout({ children, sidebar }: TwoColumnLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
        <div className="min-w-0">{children}</div>
        <div className="min-w-0">{sidebar}</div>
      </div>
    </div>
  );
}
