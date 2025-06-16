import { useTranslation } from 'react-i18next';
import type { MarkdownTable } from 'x2md';
import { SummaryGrid } from '../SummaryGrid.tsx';

export interface SummaryItem {
  label: string;
  value: string;
}

interface Props {
  tsvInput: string;
  tableData: MarkdownTable;
}

export function TsvSummary({ tsvInput, tableData }: Props) {
  const { t } = useTranslation();

  // Calculate metrics
  const columnCount = tableData.header.length;
  const rowCount = tableData.data.length;
  const characterCount = tsvInput.length;
  const sizeKB = (new TextEncoder().encode(tsvInput).length / 1024).toFixed(2);

  const summaryTitle = t('dataSummary.title');

  const summaryItems: SummaryItem[] = [
    {
      label: t('dataSummary.columns'),
      value: columnCount.toLocaleString(),
    },
    {
      label: t('dataSummary.rows'),
      value: rowCount.toLocaleString(),
    },
    {
      label: t('dataSummary.characters'),
      value: characterCount.toLocaleString(),
    },
    {
      label: t('dataSummary.sizeKB'),
      value: `${sizeKB} KB`,
    },
  ];

  return (
    <>
      <SummaryGrid title={summaryTitle} items={summaryItems} />
    </>
  );
}
