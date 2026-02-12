import { createFileRoute } from '@tanstack/react-router';
import { EhrPage } from '@/pages/ehr/EhrPage';

export const Route = createFileRoute('/ehr/')({
  component: EhrPage,
});

