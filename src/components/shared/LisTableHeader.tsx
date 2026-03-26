import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

type SortKey = 'collectionDateTime' | 'patientName' | 'specimenType' | 'testOrdered' | 'status';

interface LisTableHeaderProps {
  sortConfig: { key: SortKey; direction: 'asc' | 'desc' };
  onSort: (key: SortKey) => void;
}

export function LisTableHeader({ sortConfig, onSort }: LisTableHeaderProps) {
  const { t } = useTranslation();
  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const sortButton = (key: SortKey, label: string) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(key)}
      className={`h-8 px-2 text-xs font-semibold ${
        sortConfig.key === key ? 'text-foreground bg-accent/60' : 'text-muted-foreground'
      }`}
    >
      {label}
      <span className="ml-1">{getSortIcon(key)}</span>
    </Button>
  );

  return (
    <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-border/35 bg-muted/25 rounded-t-xl">
      <div className="col-span-2">
        {sortButton('collectionDateTime', t('dateTime'))}
      </div>
      <div className="col-span-2">
        {sortButton('patientName', t('patient'))}
      </div>
      <div className="col-span-1">
        {sortButton('specimenType', t('type'))}
      </div>
      <div className="col-span-2">
        {sortButton('testOrdered', t('test'))}
      </div>
      <div className="col-span-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2">{t('priority')}</span>
      </div>
      <div className="col-span-1">
        {sortButton('status', t('status'))}
      </div>
      <div className="col-span-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2">{t('accessionNumber')}</span>
      </div>
    </div>
  );
}
