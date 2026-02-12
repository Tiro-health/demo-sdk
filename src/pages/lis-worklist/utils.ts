import type { Specimen } from '@/types/specimen';
import type { LisSearchParams } from '@/types/lis-search-params';

export function filterAndSortSpecimens(
  specimens: Specimen[],
  params: LisSearchParams
): Specimen[] {
  const {
    search = '',
    specimenType = 'all',
    priority = 'all',
    status = 'all',
    sortBy = 'collectionDateTime',
    sortDir = 'desc',
  } = params;

  // Filter
  let result = specimens.filter((specimen) => {
    const searchLower = search.toLowerCase();
    const patientName = `${specimen.patient.firstName} ${specimen.patient.lastName}`.toLowerCase();
    const searchMatch =
      !search ||
      patientName.includes(searchLower) ||
      specimen.testOrdered.toLowerCase().includes(searchLower) ||
      specimen.specimenType.toLowerCase().includes(searchLower) ||
      specimen.accessionNumber.toLowerCase().includes(searchLower);

    const typeMatch = specimenType === 'all' || specimen.specimenType === specimenType;
    const priorityMatch = priority === 'all' || specimen.priority === priority;
    const statusMatch = status === 'all' || specimen.status === status;

    return searchMatch && typeMatch && priorityMatch && statusMatch;
  });

  // Sort
  result = [...result].sort((a, b) => {
    let aVal: string | number, bVal: string | number;

    switch (sortBy) {
      case 'collectionDateTime':
        aVal = new Date(`${a.collectionDate}T${a.collectionTime}`).getTime();
        bVal = new Date(`${b.collectionDate}T${b.collectionTime}`).getTime();
        break;
      case 'patientName':
        aVal = `${a.patient.lastName}, ${a.patient.firstName}`;
        bVal = `${b.patient.lastName}, ${b.patient.firstName}`;
        break;
      case 'specimenType':
        aVal = a.specimenType;
        bVal = b.specimenType;
        break;
      case 'testOrdered':
        aVal = a.testOrdered;
        bVal = b.testOrdered;
        break;
      case 'status':
        aVal = a.status;
        bVal = b.status;
        break;
      default:
        aVal = 0;
        bVal = 0;
    }

    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}
