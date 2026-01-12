# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mock PACS/RIS radiology worklist application for customer demonstrations. Showcases how Tiro.health SDK can be embedded into existing medical imaging systems. Dark-themed UI optimized for clinical environments.

**Key Features:**
- **Type-safe routing** with TanStack Router
- **URL-based state** for bookmarkable, shareable filtered views
- **Page-based architecture** with feature-focused organization
- **Study details** - Navigate from worklist to individual study pages
- **Real-time filtering** - Search, modality, and urgency filters update URL
- **Sortable columns** - Click headers to sort by date, patient name, or modality

## Development Commands

```bash
# Development server (runs on port 5174)
npm run dev

# Type-check and build for production
npm run build

# Preview production build (runs on port 5175)
npm run preview

# Linting
npm run lint

# Testing (Playwright E2E - not yet configured)
npm run test
npm run test:ui
npm run test:headed
```

## Architecture

### Tech Stack
- **React 18.3.1** + **TypeScript 5.6.2** - Component-based UI with strict typing
- **Vite 6.0.3** - Build tool and dev server (configured for port 5174)
- **TanStack Router** - Type-safe routing with URL state management
- **Tailwind CSS 4.1.18** - Utility-first styling with dark mode
- **shadcn/ui** - Accessible component primitives (Button, Input, Select, Badge, Card)

### Routing Architecture

The application uses **TanStack Router** with code-based route definitions:

**Routes:**
- `/` - Worklist page (search, filters, sortable table)
- `/study/:studyId` - Study details page

**Route Structure:**
```
__root.tsx (Header + Outlet)
├── index.tsx → WorklistPage
└── study.$studyId.tsx → StudyDetailsPage
```

### Folder Structure

```
src/
├── routes/                    # Route definitions
│   ├── __root.tsx            # Root layout with Header
│   ├── index.tsx             # Worklist route (/)
│   └── study.$studyId.tsx    # Study details (/study/:id)
│
├── pages/                     # Page components
│   ├── worklist/
│   │   ├── WorklistPage.tsx
│   │   ├── WorklistFilters.tsx
│   │   ├── WorklistTable.tsx
│   │   └── utils.ts          # Filter/sort logic
│   └── study-details/
│       ├── StudyDetailsPage.tsx
│       └── StudyDetailsContent.tsx
│
├── components/
│   ├── layouts/
│   │   └── TwoColumnLayout.tsx
│   ├── shared/               # Shared components
│   │   ├── Header.tsx
│   │   ├── SDKPanel.tsx
│   │   ├── ModalityBadge.tsx
│   │   ├── TableHeader.tsx
│   │   └── StudyRow.tsx
│   ├── ui/                   # shadcn/ui primitives
│   ├── SearchFilterBar.tsx
│   └── StudyList.tsx
│
├── hooks/
│   ├── useDebounce.ts
│   └── useStudies.ts         # Studies data hook
│
├── types/
│   ├── study.ts
│   └── search-params.ts      # URL search param types
│
├── lib/
│   ├── mockData.ts
│   └── utils.ts
│
└── main.tsx                   # RouterProvider setup
```

### State Management Pattern

The application uses **URL-based state management** for all filter and sort state:

**URL Search Parameters:**
- `?search=...` - Search term (patient name, description, etc.)
- `?modality=...` - Modality filter (XA, DX, PT, etc. or 'all')
- `?urgency=...` - Urgency filter (Routine, Urgent, STAT, Emergency, or 'all')
- `?sortBy=...` - Sort column (dateTime, patientName, modality)
- `?sortDir=...` - Sort direction (asc, desc)

**Data Management:**
- `useStudies()` - Hook providing cached mock studies (40 studies)
- `useStudyById(id)` - Hook for finding a single study
- Filter/sort logic in pure function (`filterAndSortStudies()`)

**Why URL state:**
- Bookmarkable filtered views
- Shareable URLs with specific filters
- Browser back/forward navigation works correctly
- No hidden state - all state is visible in URL

### Component Architecture

**Page Components:**
- `WorklistPage` - Main worklist with filters, table, and SDK panel
- `StudyDetailsPage` - Individual study details with back navigation

**Layout Components:**
- `TwoColumnLayout` - Reusable two-column grid (main content + sidebar)
- `Header` - Global app branding with medical icon

**Shared Components:**
- `SearchFilterBar` - Search input + modality/urgency dropdowns + study count
- `TableHeader` - Sortable column headers (Date/Time, Patient Name, Modality)
- `StudyList` - Container that maps filtered studies to rows
- `StudyRow` - Individual study row with click handler
- `ModalityBadge` - Color-coded badges for each modality type
- `SDKPanel` - Placeholder iframe for SDK integration

**Data Flow:**
```
URL search params → useSearch()
                     ↓
               WorklistPage
                     ↓
    ┌────────────────┼────────────────┐
    ↓                ↓                ↓
WorklistFilters  WorklistTable    SDKPanel
    ↓                ↓
navigate()    StudyList → StudyRow
                     ↓
              navigate to /study/:id
```

### Type System

All types defined in `src/types/study.ts`:
- `Modality` - Union of 8 DICOM modality codes
- `UrgencyLevel` - Routine | Urgent | STAT | Emergency
- `Patient` - Demographic data structure
- `Study` - Complete study interface with patient, modality, dates, etc.
- `SortConfig` - Sort state with key and direction

### Mock Data Generation

`src/lib/mockData.ts` contains:
- Data pools (first names, last names, study descriptions by modality)
- `generateStudies(count)` function that creates realistic radiology data
- Date range: Last 7 days, working hours (08:00-19:00)
- Patient ages: 15-85 years old
- Urgency distribution: 60% Routine, 25% Urgent, 10% STAT, 5% Emergency

### Path Aliasing

Vite configured with `@` alias pointing to `src/`:
```typescript
import { Study } from '@/types/study';
import { Header } from '@/components/shared/Header';
```

### Navigation & Routing

**Programmatic Navigation:**
```typescript
const navigate = useNavigate({ from: '/' });

// Navigate to study details
navigate({ to: '/study/$studyId', params: { studyId: 'study-001' } });

// Update search params
navigate({ search: (prev) => ({ ...prev, modality: 'CT' }) });

// Go back
navigate({ to: '/' });
```

**Type-Safe Params:**
```typescript
// Path params (from route definition)
const { studyId } = useParams({ from: '/study/$studyId' });

// Search params (from URL query string)
const searchParams = useSearch({ from: '/' });
// Returns: { search?, modality?, urgency?, sortBy?, sortDir? }
```

**Route Files:**
- Routes are defined in `src/routes/` directory
- File names map to URL paths (e.g., `study.$studyId.tsx` → `/study/:studyId`)
- Each route exports a `Route` object created with `createFileRoute()`
- The Vite plugin auto-generates `routeTree.gen.ts` from route files

## Key Implementation Details

### Search Implementation
- **Debounced:** 300ms delay using custom `useDebounce` hook
- **Multi-field:** Searches patient name, study description, research question, accession number
- **Case-insensitive:** All comparisons use `.toLowerCase()`

### Filter/Sort Logic
All filtering and sorting happens in `src/pages/worklist/utils.ts` via a pure function:
1. Read filter/sort params from URL
2. Filter by search term (multi-field: patient name, study description, research question, accession number)
3. Filter by modality (if not 'all')
4. Filter by urgency (if not 'all')
5. Sort by `sortBy` param (dateTime, patientName, or modality) in `sortDir` direction (asc/desc)
6. Return filtered and sorted array

**Why pure function:** Simple, testable, no side effects. Input (studies + params) → Output (filtered studies).

### Dark Mode
Forced via `document.documentElement.classList.add('dark')` in `main.tsx`. Not toggleable by user.

### shadcn/ui Integration
Components are copied into `src/components/ui/` directory (not imported from package). Customized with dark theme color palette using OKLCH color space.

## Modality Color Mapping

Each modality has a distinct Tailwind color for quick visual identification:
- **XA** (Angiography): Blue
- **DX** (Digital X-Ray): Green
- **PT** (PET/CT): Purple
- **NM** (Nuclear Medicine): Amber
- **MG** (Mammogram): Pink
- **CR** (Computed Radiography): Cyan
- **MR** (MRI): Indigo
- **CT** (CT Scan): Red

Implemented in `ModalityBadge.tsx` with variant mapping.

## Port Configuration

**IMPORTANT:** Ports are hard-coded for Playwright testing:
- Dev server: `5174` (strictPort: true)
- Preview: `5175`

Do not change these without updating test configuration.

## SDK Integration

`SDKPanel.tsx` currently shows a Google iframe (which blocks, as expected). This is a placeholder demonstrating where Tiro.health SDK will be embedded.

**To integrate real SDK:**
1. Replace iframe `src` with actual Tiro.health SDK URL
2. Implement authentication
3. Pass `selectedStudyId` to SDK when user clicks a row
4. Handle SDK callbacks/events

## Testing

Playwright is listed in `package.json` but no `playwright.config.ts` exists yet. When adding tests:
- Ensure dev server runs on port 5174
- Test search, filtering, sorting, row selection
- Test accessibility of shadcn/ui components

## Common Pitfalls

1. **Route import paths:** Components moved to `@/components/shared/` and `@/components/layouts/` - update imports accordingly
2. **Search param types:** URL search params come as `unknown` - must validate/coerce before use
3. **Navigation context:** Always specify `from` in `useNavigate()` and `useSearch()` for type safety
4. **Adding new modalities:** Update both `Modality` type AND `STUDY_DESCRIPTIONS` mapping in `mockData.ts`
5. **Changing ports:** Must update both `vite.config.ts` and any test configuration
6. **Breaking dark mode:** All color classes must have dark mode variants
7. **Route file naming:** TanStack Router uses `$` for params (e.g., `study.$studyId.tsx` not `study/[studyId].tsx`)
8. **Forgetting route tree generation:** The Vite plugin auto-generates `routeTree.gen.ts` - don't edit it manually

## Future Enhancement Areas

The codebase is production-ready for demos but could be extended with:
- **Actual Tiro.health SDK integration** - Replace iframe in `SDKPanel.tsx` with real SDK
- **Enhanced study details** - Add more medical imaging metadata, viewing history, etc.
- **Pagination** - For datasets >100 studies (current: client-side filtering of 40)
- **Mobile responsive design** - Current implementation is desktop-optimized only
- **DICOM viewer integration** - Embed medical image viewer on study details page
- **Persistent user preferences** - Save default sort/filter settings per user
- **Search params validation** - Add TanStack Router search param validators with proper types
- **Loading states** - Add skeleton loaders for better UX during navigation
