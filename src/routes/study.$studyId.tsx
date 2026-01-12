import { createFileRoute } from '@tanstack/react-router';
import { StudyDetailsPage } from '@/pages/study-details/StudyDetailsPage';

export const Route = createFileRoute('/study/$studyId')({
  component: StudyDetailsPage,
});
