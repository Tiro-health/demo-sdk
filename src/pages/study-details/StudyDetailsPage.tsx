import { useParams, useNavigate } from '@tanstack/react-router';
import { useStudyById } from '@/hooks/useStudies';
import { DicomViewer } from '@/components/shared/DicomViewer';
import { ReportingForm } from '@/components/shared/ReportingForm';
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
    <div className="h-[calc(100vh-3.5rem)] p-4">
      <div className="mb-4">
        <Button onClick={() => navigate({ to: '/' })} variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Worklist
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
        <DicomViewer />
        <ReportingForm study={study} />
      </div>
    </div>
  );
}
