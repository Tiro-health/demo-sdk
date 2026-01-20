import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DicomViewer() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">DICOM Viewer</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 bg-black rounded-md flex items-center justify-center overflow-hidden">
          <img
            src="https://www.nobleimaginganddiagnostics.com/wp-content/uploads/2025/04/MRI-Abdomen-or-Pelvis.png"
            alt="MRI Abdomen/Pelvis"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
}
