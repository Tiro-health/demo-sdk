import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useTheme } from '@/hooks/useTheme';
import { LisHeader } from '@/pages/lis-worklist/LisHeader';

export const Route = createFileRoute('/lis')({
  component: LisLayout,
});

function LisLayout() {
  useTheme('light');

  return (
    <>
      <LisHeader />
      <Outlet />
    </>
  );
}
