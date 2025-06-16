import { Alert, Box, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type DelimiterRow, type MarkdownTable, toTable } from 'x2md';
import {
  type ColumnAlignment,
  createDelimiterFromAlignments,
} from '../../utils/table-utils.js';
import { CopyButton } from './CopyButton.jsx';

interface Props {
  tableData: MarkdownTable;
  maxRows?: number;
  customColumnAlignments?: ColumnAlignment[];
  handleUpdateMarkdownTable: (newMarkdown: string) => void;
}

export function MarkdownOutput({
  // markdown,
  tableData,
  maxRows = 10,
  customColumnAlignments,
  handleUpdateMarkdownTable,
}: Props) {
  const { t } = useTranslation();

  const [newMarkdownTable, setNewMarkdownTable] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (tableData.header.length < 1) {
      // console.debug('No header found in TSV data');
      // Assuming handleUpdateMarkdownTable expects a string, even if empty
      setNewMarkdownTable('');
      setError(null);
      handleUpdateMarkdownTable('');
      return;
    }
  }, [handleUpdateMarkdownTable, tableData]);

  useEffect(() => {
    if (tableData.header.length < 1) {
      // console.debug('No header found in TSV data');
      // Assuming handleUpdateMarkdownTable expects a string, even if empty
      setError(null);
      handleUpdateMarkdownTable('');
      return;
    }

    try {
      // Create custom delimiter if alignments are provided
      let customDelimiter: DelimiterRow = [...tableData.delimiter];
      if (customColumnAlignments != null) {
        customDelimiter = createDelimiterFromAlignments(customColumnAlignments);
      }

      const generatedMarkdownTable: string = toTable(
        tableData,
        customDelimiter,
      );

      setNewMarkdownTable(generatedMarkdownTable);
      setError(null);
      handleUpdateMarkdownTable(generatedMarkdownTable);
    } catch (err) {
      console.error('Error generating markdown table:', err);
      const errorMessage = t('errors.markdownGenerationFailed');
      setError(errorMessage);
      setNewMarkdownTable('');
      handleUpdateMarkdownTable('');
    }
  }, [tableData, customColumnAlignments, handleUpdateMarkdownTable, t]);

  return (
    <Paper
      elevation={2}
      sx={{
        height: '100%',
        p: 2,
      }}
    >
      {/* <Typography variant="h5" component="h2" gutterBottom>
        {t('markdownOutput')}
      </Typography> */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" component="h2">
          {t('markdownOutput')}
        </Typography>
        <CopyButton text={newMarkdownTable} disabled={!newMarkdownTable} />
      </Box>

      <TextField
        multiline
        fullWidth
        minRows={3}
        maxRows={maxRows}
        value={newMarkdownTable}
        variant="outlined"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        sx={{ fontFamily: 'monospace' }}
      />
    </Paper>
  );
}
