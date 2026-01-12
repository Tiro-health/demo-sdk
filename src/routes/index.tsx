import { createFileRoute } from '@tanstack/react-router';
import { WorklistPage } from '@/pages/worklist/WorklistPage';

export const Route = createFileRoute('/')({
  component: WorklistPage,
});
