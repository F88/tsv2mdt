import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Tooltip } from '@mui/material';
import { useLanguageContext } from '../../contexts/language-context.js';

export function SelectNextLanguage() {
  const { setNextLanguage, nextLanguage } = useLanguageContext();

  return (
    <Tooltip title={`Switch language to ${nextLanguage()}`}>
      <IconButton
        onClick={setNextLanguage}
        color="inherit"
        // size="large"
        aria-label={`Switch language to ${nextLanguage()}`}
      >
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  );
}
