import { Grid, useMediaQuery, useTheme } from '@mui/material';
import type { MarkdownTable } from 'x2md';
import type { ColumnAlignment } from '../../utils/table-utils.js';
import { MarkdownOutput } from './MarkdownOutput.jsx';
import { MarkdownSummary } from './MarkdownSummary.jsx';

interface Props {
  tableData: MarkdownTable;
  customColumnAlignments?: ColumnAlignment[];
  handleUpdateMarkdownTable: (newMarkdown: string) => void;
  markdownOutput: string;
}

export function Markdown(props: Props) {
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
        <MarkdownOutput
          // markdown={markdown}
          tableData={props.tableData}
          maxRows={isSmallDisplay ? 5 : 30}
          customColumnAlignments={undefined}
          handleUpdateMarkdownTable={props.handleUpdateMarkdownTable}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 3,
        }}
      >
        <MarkdownSummary
          tableData={props.tableData}
          markdownOutput={props.markdownOutput}
        />
      </Grid>
    </Grid>
  );
}
