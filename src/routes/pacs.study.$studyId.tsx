import { createFileRoute } from '@tanstack/react-router';
import { StudyDetailsPage } from '@/pages/study-details/StudyDetailsPage';

export const Route = createFileRoute('/pacs/study/$studyId')({
  component: StudyDetailsPage,
});
