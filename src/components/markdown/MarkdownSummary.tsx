import { useTranslation } from 'react-i18next';
import type { MarkdownTable } from 'x2md';
import { SummaryGrid } from '../SummaryGrid.tsx';

export interface SummaryItem {
  label: string;
  value: string;
}

interface Props {
  tableData: MarkdownTable;
  markdownOutput: string;
}

export function MarkdownSummary({ tableData, markdownOutput }: Props) {
  const { t } = useTranslation();

  // Calculate metrics
  const columnCount = tableData.header.length;
  const rowCount = tableData.data.length;
  const characterCount = markdownOutput.length;
  const sizeKB = (
    new TextEncoder().encode(markdownOutput).length / 1024
  ).toFixed(2);

  const summaryTitle = t('markdownSummary.title');

  const summaryItems: SummaryItem[] = [
    {
      label: t('markdownSummary.columns'),
      value: columnCount.toLocaleString(),
    },
    {
      label: t('markdownSummary.rows'),
      value: rowCount.toLocaleString(),
    },
    {
      label: t('markdownSummary.characters'),
      value: characterCount.toLocaleString(),
    },
    {
      label: t('markdownSummary.sizeKB'),
      value: `${sizeKB} KB`,
    },
  ];

  return (
    <>
      {/* <SummaryList title={summaryTitle} items={summaryItems} /> */}
      <SummaryGrid title={summaryTitle} items={summaryItems} />
    </>
  );
}
