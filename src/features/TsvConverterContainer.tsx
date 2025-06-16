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
import { Actions } from './Actions.jsx';

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
    } catch (err) {
      console.error('Error parsing TSV data:', err);
      // Set empty table data on parse error
      setTableData({
        header: [],
        data: [],
        delimiter: [],
      });
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
    setTsvInput('');
    setTableData({
      header: [],
      data: [],
      delimiter: [],
    });
    setMarkdown('');
    setHtmlOutput('');
  };

  const handleLoadSample = () => {
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
          customColumnAlignments={undefined}
          handleUpdateMarkdownTable={(newMarkdown) => {
            setMarkdown(newMarkdown);
          }}
          markdownOutput={markdown}
        />

        {/*<PerformanceMetrics metrics={performanceMetrics} />*/}

        <HtmlPreview htmlOutput={htmlOutput} />
      </Stack>
    </Container>
  );
}
