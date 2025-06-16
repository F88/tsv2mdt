import { DarkMode, LightMode } from '@mui/icons-material';
import ContrastIcon from '@mui/icons-material/Contrast';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../contexts/theme-context.js';

export function SelectThemeButtonGroup() {
  const { theme, setToLight, setToDark, setToAuto } = useThemeContext();
  const { t } = useTranslation();

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={theme}
      exclusive
      aria-label="text alignment"
    >
      <Tooltip title={t('themeButton.light')}>
        <ToggleButton
          value="light"
          aria-label={t('themeButton.light')}
          onClick={setToLight}
          // disabled={theme === 'light'}
          sx={{
            color: '#ff6f69',
            // borderColor: '#ffff69',
          }}
        >
          <LightMode />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t('themeButton.dark')}>
        <ToggleButton
          value="dark"
          aria-label={t('themeButton.dark')}
          onClick={setToDark}
          // disabled={theme === 'dark'}
          sx={{ color: '#e2c96e' }}
        >
          <DarkMode />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t('themeButton.auto')}>
        <ToggleButton
          value="auto"
          aria-label={t('themeButton.auto')}
          onClick={setToAuto}
          // disabled={theme === 'auto'}
          sx={{ color: '#9c27b0' }}
        >
          <ContrastIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
