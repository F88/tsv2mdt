import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../../contexts/language-context.js';

export function SelectLanguageButtonGroup() {
  const { language, changeLanguage } = useLanguageContext();
  const { t } = useTranslation();

  return (
    <ToggleButtonGroup
      value={language}
      color={'info'}
      exclusive
      sx={
        {
          // padding: 2,
        }
      }
    >
      <Tooltip title={t('languageButton.switchToEnglish')}>
        <ToggleButton
          value="en"
          aria-label={t('languageButton.switchToEnglish')}
          // color="info"
          onClick={() => {
            changeLanguage('en');
          }}
          // disabled={language === 'en'}
          sx={
            {
              // color: '#e2c96e'
            }
          }
        >
          en
        </ToggleButton>
      </Tooltip>

      <Tooltip title={t('languageButton.switchToFrench')}>
        <ToggleButton
          value="fr"
          aria-label={t('languageButton.switchToFrench')}
          // color="info"
          onClick={() => {
            changeLanguage('fr');
          }}
          // disabled={language === 'fr'}
          sx={
            {
              // color: '#e2c96e'
            }
          }
        >
          fr
        </ToggleButton>
      </Tooltip>

      <Tooltip title={t('languageButton.switchToJapanese')}>
        <ToggleButton
          value="ja"
          aria-label={t('languageButton.switchToJapanese')}
          // color="info"
          onClick={() => {
            changeLanguage('ja');
          }}
          // disabled={language === 'ja'}
          sx={
            {
              // color: '#ff6f69',
              // borderColor: '#ffff69',
            }
          }
        >
          ja
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
