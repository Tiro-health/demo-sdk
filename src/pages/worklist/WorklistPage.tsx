import { useSearch, useNavigate } from "@tanstack/react-router";
import { useStudies } from "@/hooks/useStudies";
import { WorklistFilters } from "./WorklistFilters";
import { WorklistTable } from "./WorklistTable";
import { filterAndSortStudies } from "./utils";

export function WorklistPage() {
  const studies = useStudies();
  const rawSearchParams = useSearch({ from: "/pacs/" });
  const navigate = useNavigate({ from: "/pacs/" });

  // Provide defaults for search params
  const searchParams = {
    search:
      typeof rawSearchParams.search === "string" ? rawSearchParams.search : "",
    modality:
      typeof rawSearchParams.modality === "string"
        ? rawSearchParams.modality
        : "all",
    urgency:
      typeof rawSearchParams.urgency === "string"
        ? rawSearchParams.urgency
        : "all",
    sortBy:
      rawSearchParams.sortBy === "dateTime" ||
      rawSearchParams.sortBy === "patientName" ||
      rawSearchParams.sortBy === "modality"
        ? rawSearchParams.sortBy
        : "dateTime",
    sortDir:
      rawSearchParams.sortDir === "asc" || rawSearchParams.sortDir === "desc"
        ? rawSearchParams.sortDir
        : "desc",
  } as const;

  const filteredStudies = filterAndSortStudies(studies, searchParams);

  const handleFilterChange = (newParams: Partial<typeof searchParams>) => {
    navigate({ search: (prev) => ({ ...prev, ...newParams }) });
  };

  const handleStudyClick = (studyId: string) => {
    navigate({ to: "/pacs/study/$studyId", params: { studyId } });
  };

  return (
    <div className="worklist-page-shell worklist-page-shell-pacs">
      <div className="worklist-content max-w-[1320px] mx-auto p-4 md:p-6 space-y-5">
        <section className="worklist-panel">
          <WorklistFilters
            searchParams={searchParams}
            onFilterChange={handleFilterChange}
            studyCount={filteredStudies.length}
          />
        </section>
        <section className="worklist-panel">
          <WorklistTable
            studies={filteredStudies}
            searchParams={searchParams}
            onStudyClick={handleStudyClick}
            onSortChange={handleFilterChange}
          />
        </section>
      </div>
    </div>
  );
}
