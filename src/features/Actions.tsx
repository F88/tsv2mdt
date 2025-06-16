import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
interface Props {
  onLoadSample: () => void;
  onClearAll: () => void;
}

export function Actions({ onLoadSample, onClearAll }: Props) {
  const { t } = useTranslation();
  return (
    <Box display="flex" gap={2} justifyContent="center" sx={{ mb: 4 }}>
      <Button
        variant="contained"
        onClick={onLoadSample}
        color="primary"
        size="large"
        // color="warning"
        // color="secondary"
        // color="info"
        startIcon={<AutoAwesomeIcon />}
      >
        {t('loadSample')}
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={onClearAll}
        // color="secondary"
        startIcon={<ClearAllIcon />}
        color="warning"
      >
        {t('clearAll')}
      </Button>
    </Box>
  );
}
