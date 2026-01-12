import { Study } from '@/types/study';
import { WorklistSearchParams } from '@/types/search-params';

export function filterAndSortStudies(
  studies: Study[],
  params: WorklistSearchParams
): Study[] {
  const {
    search = '',
    modality = 'all',
    urgency = 'all',
    sortBy = 'dateTime',
    sortDir = 'desc',
  } = params;

  // Filter
  let result = studies.filter((study) => {
    const searchLower = search.toLowerCase();
    const patientName = `${study.patient.firstName} ${study.patient.lastName}`.toLowerCase();
    const searchMatch =
      !search ||
      patientName.includes(searchLower) ||
      study.studyDescription.toLowerCase().includes(searchLower) ||
      study.researchQuestion.toLowerCase().includes(searchLower) ||
      study.accessionNumber.toLowerCase().includes(searchLower);

    const modalityMatch = modality === 'all' || study.modality === modality;
    const urgencyMatch = urgency === 'all' || study.urgency === urgency;

    return searchMatch && modalityMatch && urgencyMatch;
  });

  // Sort
  result = [...result].sort((a, b) => {
    let aVal: any, bVal: any;

    switch (sortBy) {
      case 'dateTime':
        aVal = new Date(`${a.studyDate}T${a.studyTime}`).getTime();
        bVal = new Date(`${b.studyDate}T${b.studyTime}`).getTime();
        break;
      case 'patientName':
        aVal = `${a.patient.lastName}, ${a.patient.firstName}`;
        bVal = `${b.patient.lastName}, ${b.patient.firstName}`;
        break;
      case 'modality':
        aVal = a.modality;
        bVal = b.modality;
        break;
    }

    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}
