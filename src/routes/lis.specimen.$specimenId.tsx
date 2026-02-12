import { createFileRoute } from '@tanstack/react-router';
import { SpecimenDetailsPage } from '@/pages/specimen-details/SpecimenDetailsPage';

export const Route = createFileRoute('/lis/specimen/$specimenId')({
  component: SpecimenDetailsPage,
});
