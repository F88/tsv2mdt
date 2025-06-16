import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function TsvConverterHeader() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Typography
        //
        variant="h3"
        component="h1"
        textAlign="center"
        gutterBottom
      >
        {t('title')}
      </Typography>
      <Typography
        //
        variant="body1"
        textAlign="center"
        gutterBottom
      >
        {t('usage')}
      </Typography>
    </Box>
  );
}
