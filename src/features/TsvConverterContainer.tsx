import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { type MarkdownTable, parseTsv } from 'x2md';
import { ExampleData } from '../assets/sample-data.ts';
import { Markdown } from '../components/markdown/Markdown.jsx';
import { HtmlPreview } from '../components/preview/HtmlPreview.jsx';
import { Tsv } from '../components/tsv/Tsv.jsx';
import { TsvConverterHeader } from '../components/tsv/TsvConverterHeader.jsx';
import { convertMarkdownTableToHtml } from '../utils/tsv-converter.js';
import type { ColumnAlignment } from '../utils/table-utils.js';
import { Actions } from './Actions.jsx';

import { logEvent } from 'firebase/analytics';
import { analytics } from '../utils/firebase-utils.ts';

export function TsvConverterContainer() {
  const [tsvInput, setTsvInput] = useState('');
  const [indexOfExamples, setIndexOfExamples] = useState<number>(0);
  const [tableData, setTableData] = useState<MarkdownTable>({
    header: [],
    data: [],
    delimiter: [],
  });
  const [htmlOutput, setHtmlOutput] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [columnAlignments, setColumnAlignments] = useState<ColumnAlignment[]>(
    [],
  );

  const handleTsvInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTsvInput(event.target.value);
  };

  // Update derived states when tsvInput changes
  useEffect(() => {
    try {
      const tableData: MarkdownTable = parseTsv(tsvInput);
      setTableData(tableData);
      // Reset column alignments when table structure changes
      setColumnAlignments(new Array(tableData.header.length).fill(undefined));
    } catch (err) {
      console.error('Error parsing TSV data:', err);
      // Set empty table data on parse error
      setTableData({
        header: [],
        data: [],
        delimiter: [],
      });
      setColumnAlignments([]);
    }
  }, [tsvInput]);

  useEffect(() => {
    try {
      const html = convertMarkdownTableToHtml(tableData);
      setHtmlOutput(html);
    } catch (err) {
      console.error('Error converting markdown to HTML:', err);
      // Set empty HTML output on conversion error
      setHtmlOutput('');
    }
  }, [markdown, tableData]);

  const handleClearAll = () => {
    // Firestore analytics event for clearing all
    logEvent(analytics, 'select_content', {
      content_type: 'event',
      item_id: 'clear-all',
    });

    // Reset all states
    setTsvInput('');
    setTableData({
      header: [],
      data: [],
      delimiter: [],
    });
    setMarkdown('');
    setHtmlOutput('');
    setColumnAlignments([]);
  };

  const handleAlignmentChange = (
    columnIndex: number,
    alignment: ColumnAlignment,
  ) => {
    setColumnAlignments((prev) => {
      const newAlignments = [...prev];
      newAlignments[columnIndex] = alignment;
      return newAlignments;
    });
  };

  const handleLoadSample = () => {
    // Firebase Analytics event for loading sample data
    logEvent(analytics, 'select_content', {
      content_type: 'event',
      item_id: 'load-example',
    });

    // Select a random sample data from ExampleData
    const sampleDataArray = ExampleData;
    const randomIndex = Math.floor(Math.random() * sampleDataArray.length);
    setIndexOfExamples((prevState) => {
      // Ensure the index is different from the last one
      return prevState === randomIndex
        ? (randomIndex + 1) % sampleDataArray.length
        : randomIndex;
    });
    const selectedSampleData = sampleDataArray[indexOfExamples];
    setTsvInput(selectedSampleData);
  };

  return (
    <Container
      // maxWidth={false}
      maxWidth={'xl'}
      sx={{
        py: 4,
      }}
    >
      <TsvConverterHeader />

      <Actions onLoadSample={handleLoadSample} onClearAll={handleClearAll} />

      <Stack spacing={2}>
        <Tsv
          tsvInput={tsvInput}
          tableData={tableData}
          onChange={handleTsvInputChange}
        />

        <Markdown
          tableData={tableData}
          customColumnAlignments={columnAlignments}
          handleUpdateMarkdownTable={(newMarkdown) => {
            setMarkdown(newMarkdown);
          }}
          markdownOutput={markdown}
          onAlignmentChange={handleAlignmentChange}
        />

        {/*<PerformanceMetrics metrics={performanceMetrics} />*/}

        <HtmlPreview htmlOutput={htmlOutput} />
      </Stack>
    </Container>
  );
}
