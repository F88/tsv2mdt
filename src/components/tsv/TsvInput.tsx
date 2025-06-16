import { Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  tsvInput: string;
  maxRows?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TsvInput({ tsvInput, onChange, maxRows = 10 }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Paper
        // variant="outlined"
        variant="elevation"
        // elevation={2}
        elevation={2}
        sx={{
          height: '100%',
          p: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {t('tsvInput')}
        </Typography>

        <TextField
          multiline
          fullWidth
          // rows={20}
          minRows={3}
          maxRows={maxRows}
          value={tsvInput}
          onChange={onChange}
          placeholder={t('tsvPlaceholder')}
          variant="outlined"
          sx={{
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            // wrap: 'none',
            // nowrap: '',
          }}
        />
      </Paper>
    </>
  );
}
