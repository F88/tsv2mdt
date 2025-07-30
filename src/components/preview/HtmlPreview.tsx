import { Box, Paper, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

interface Props {
  htmlOutput: string;
}

export function HtmlPreview({ htmlOutput }: Props) {
  const { t } = useTranslation();
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {t('htmlPreview')}
      </Typography>
      <Box
        sx={{
          fontFamily: 'system-ui, sans-serif',
          minHeight: 200,
          p: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          overflowX: 'auto',
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          },
          '& th, & td': {
            border: 1,
            borderColor: 'divider',
            padding: '8px 12px',
            // textAlign: 'left',
          },
          '& th': {
            backgroundColor: 'action.hover',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          '& tr:nth-of-type(even)': {
            backgroundColor: 'action.selected',
          },
        }}
        // dangerouslySetInnerHTML={{ __html: htmlOutput }}
        /* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlOutput) }}
      />
    </Paper>
  );
}
