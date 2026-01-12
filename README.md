# Mock PACS Radiology Worklist

A dark-themed mock PACS/RIS radiology worklist application for customer demonstrations, showcasing how Tiro.health SDK can be embedded into existing medical imaging systems.

![Demo Screenshot](/Users/axelvanraes/dev/atticus/demo-pacs/.playwright-mcp/worklist-dark-mode.png)

## Features

- **Dark Mode UI** - Professional dark theme optimized for clinical environments
- **40 Mock Studies** - Realistic radiology study data with variety across modalities
- **Real-time Search** - Debounced search across patient names, study descriptions, and research questions
- **Advanced Filtering** - Filter by modality (XA, DX, PT, NM, MG, CR, MR, CT) and urgency level
- **Sortable Columns** - Sort by date/time, patient name, or modality
- **Interactive Study Selection** - Click to select studies with visual feedback
- **SDK Integration Panel** - Demonstrates embedded Tiro.health SDK concept
- **Responsive Layout** - Desktop-optimized two-column layout

## Tech Stack

- **React 18.3.1** + **TypeScript 5.6.2**
- **Vite 6.0.3** - Fast build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **lucide-react** - Icon library
- **Playwright** - E2E testing

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

The dev server runs on **port 5174** (configured for Playwright testing):

```bash
npm run dev
```

Open http://localhost:5174 in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── types/
│   └── study.ts                    # TypeScript interfaces
├── lib/
│   ├── mockData.ts                 # Mock data generator (40 studies)
│   └── utils.ts                    # Utility functions
├── hooks/
│   └── useDebounce.ts              # Debounce hook (300ms)
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── Header.tsx                  # App header
│   ├── SearchFilterBar.tsx         # Search and filters
│   ├── TableHeader.tsx             # Sortable column headers
│   ├── StudyRow.tsx                # Individual study row
│   ├── StudyList.tsx               # Study list container
│   ├── ModalityBadge.tsx           # Colored modality badges
│   ├── SDKPanel.tsx                # Tiro.health SDK panel
│   └── WorklistLayout.tsx          # Main layout
├── App.tsx                         # Main application
├── main.tsx                        # Entry point
└── index.css                       # Global styles
```

## Mock Data

The application generates 40 realistic radiology studies with:

- **Date Range:** Last 7 days (2025-12-16 to 2025-12-22)
- **Time Range:** 08:00-19:00 (working hours)
- **Patient Ages:** 15-85 years old
- **Modalities:** XA, DX, PT, NM, MG, CR, MR, CT
- **Urgency Levels:** Routine (60%), Urgent (25%), STAT (10%), Emergency (5%)
- **Diverse Patient Demographics:** Realistic names, genders, and dates of birth

## Features in Detail

### Search Functionality

- **Debounced Input:** 300ms delay to prevent excessive re-renders
- **Multi-field Search:** Searches across:
  - Patient names (first and last)
  - Study descriptions
  - Research questions
  - Accession numbers
- **Case-insensitive:** Works with any capitalization
- **Real-time Results:** Study count updates automatically

### Filtering

**Modality Filter:**
- All Modalities (default)
- XA - Angiography
- DX - Digital X-Ray
- PT - PET/CT
- NM - Nuclear Medicine
- MG - Mammogram
- CR - Computed Radiography
- MR - MRI
- CT - CT Scan

**Urgency Filter:**
- All Urgency (default)
- Routine
- Urgent
- STAT
- Emergency

### Sorting

Sortable columns with toggle between ascending/descending:
- **Date/Time** (default: descending - most recent first)
- **Patient Name** (alphabetical by last name)
- **Modality** (alphabetical)

### Study Row Interaction

- **Click to Select:** Visual highlight with primary ring
- **Keyboard Navigation:** Tab through rows, Enter to select
- **Console Logging:** Selected study details logged for demo purposes

## Styling & Design

### Color Palette (Dark Mode)

- **Background:** `oklch(0.145 0 0)` - Very dark gray
- **Foreground:** `oklch(0.985 0 0)` - Near white
- **Study Row:** `oklch(0.18 0 0)` - Slightly lighter
- **Hover:** `oklch(0.22 0 0)` - Interactive feedback
- **Border:** Subtle gray borders for separation

### Modality Badge Colors

Each modality has a distinct color for quick identification:
- **XA:** Blue
- **DX:** Green
- **PT:** Purple
- **NM:** Amber
- **MG:** Pink
- **CR:** Cyan
- **MR:** Indigo
- **CT:** Red

## SDK Integration

The right panel demonstrates how the Tiro.health SDK can be embedded into existing PACS/RIS systems. Currently shows an iframe (Google blocks it, which is expected) as a placeholder for actual SDK integration.

**For Production Integration:**
- Replace iframe source with actual Tiro.health SDK URL
- Implement proper authentication
- Pass study context to SDK when row is clicked
- Handle SDK callbacks and events

## Testing with Playwright

The application is configured for Playwright E2E testing on port 5174:

```bash
npm install -D @playwright/test
npx playwright install
npm run test
```

### Test Coverage

- Smoke tests (app loads, components render)
- Search functionality
- Filter functionality (modality and urgency)
- Sort functionality
- Row interaction and selection

## Configuration

### Vite Config

```typescript
server: {
  port: 5174,
  strictPort: true,
}
```

### Dark Mode

Dark mode is forced via `document.documentElement.classList.add('dark')` in `main.tsx`.

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- **Initial Load:** <1 second
- **Search Response:** <300ms (debounced)
- **Filter/Sort:** Instant (client-side)
- **No Virtualization:** 40 rows perform well without virtual scrolling

## Future Enhancements

- Real Tiro.health SDK integration
- DICOM image viewer integration
- Study details modal
- Pagination for larger datasets
- User preferences/settings
- Export functionality (CSV/PDF)
- Real-time updates via WebSocket
- Mobile responsive design

## License

Private - For Tiro.health customer demonstrations only.

## Support

For questions or issues, contact the Tiro.health development team.
