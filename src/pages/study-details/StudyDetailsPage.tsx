import { useParams, useNavigate } from '@tanstack/react-router';
import { useStudyById } from '@/hooks/useStudies';
import { TwoColumnLayout } from '@/components/layouts/TwoColumnLayout';
import { SDKPanel } from '@/components/shared/SDKPanel';
import { StudyDetailsContent } from './StudyDetailsContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function StudyDetailsPage() {
  const { studyId } = useParams({ from: '/study/$studyId' });
  const study = useStudyById(studyId);
  const navigate = useNavigate();

  if (!study) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Study not found</h1>
        <Button onClick={() => navigate({ to: '/' })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Worklist
        </Button>
      </div>
    );
  }

  return (
    <TwoColumnLayout sidebar={<SDKPanel />}>
      <div className="space-y-4">
        <Button onClick={() => navigate({ to: '/' })} variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Worklist
        </Button>
        <StudyDetailsContent study={study} />
      </div>
    </TwoColumnLayout>
  );
}
