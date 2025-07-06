import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { ColumnAlignment } from '../../utils/table-utils.js';

interface Props {
  columnNames: string[];
  alignments: ColumnAlignment[];
  onAlignmentChange: (columnIndex: number, alignment: ColumnAlignment) => void;
}

export function ColumnAlignmentControls({
  columnNames,
  alignments,
  onAlignmentChange,
}: Props) {
  const { t } = useTranslation();

  if (columnNames.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '100%',
      }}
    >
      <Typography variant="h6" component="h3" gutterBottom>
        {t('columnAlignment')}
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {columnNames.map((columnName, index) => (
          <FormControl key={index} size="small" fullWidth>
            <InputLabel id={`alignment-select-${index}-label`}>
              {columnName}
            </InputLabel>
            <Select
              labelId={`alignment-select-${index}-label`}
              id={`alignment-select-${index}`}
              value={alignments[index] || ''}
              label={columnName}
              onChange={(event) =>
                onAlignmentChange(
                  index,
                  (event.target.value as ColumnAlignment) || undefined,
                )
              }
            >
              <MenuItem value="">
                <em>{t('alignmentDefault')}</em>
              </MenuItem>
              <MenuItem value="left">{t('alignmentLeft')}</MenuItem>
              <MenuItem value="center">{t('alignmentCenter')}</MenuItem>
              <MenuItem value="right">{t('alignmentRight')}</MenuItem>
            </Select>
          </FormControl>
        ))}
      </Box>
    </Paper>
  );
}