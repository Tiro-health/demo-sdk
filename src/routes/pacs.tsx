import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useTheme } from '@/hooks/useTheme';
import { PacsHeader } from '@/pages/worklist/PacsHeader';

export const Route = createFileRoute('/pacs')({
  component: PacsLayout,
});

function PacsLayout() {
  useTheme('dark');

  return (
    <>
      <PacsHeader />
      <Outlet />
    </>
  );
}
