import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useTheme } from '@/hooks/useTheme';
import { EhrHeader } from '@/pages/ehr/EhrHeader';

export const Route = createFileRoute('/ehr')({
  component: EhrLayout,
});

function EhrLayout() {
  useTheme('light');

  return (
    <>
      <EhrHeader />
      <Outlet />
    </>
  );
}

