import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import type { MarkdownTable } from 'x2md';
import { TsvInput } from './TsvInput.jsx';
import { TsvSummary } from './TsvSummary.jsx';

interface Props {
  tsvInput: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  tableData: MarkdownTable;
}

export function Tsv({ tsvInput, onChange, tableData }: Props) {
  /*
   * xs, extra-small: 0px
   * sm, small: 600px
   * md, medium: 900px
   * lg, large: 1200px
   * xl, extra-large: 1536px
   */
  const theme = useTheme();
  const isSmallDisplay: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={2}
      size={{
        xs: 12,
        sm: 12,
        md: 9,
      }}
    >
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 9,
        }}
      >
        <TsvInput
          tsvInput={tsvInput}
          maxRows={isSmallDisplay ? 5 : 30}
          onChange={onChange}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 3,
        }}
      >
        <TsvSummary tsvInput={tsvInput} tableData={tableData} />
      </Grid>
    </Grid>
  );
}
