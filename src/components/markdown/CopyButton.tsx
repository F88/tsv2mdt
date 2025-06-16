import { useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import DoneIcon from '@mui/icons-material/Done';

interface Props {
  text: string;
  disabled?: boolean;
}

export function CopyButton({ text, disabled = false }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text || disabled) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
    }
  };

  const handleClick = () => {
    void handleCopy();
  };

  return (
    <Button
      // variant="outlined"
      variant="contained"
      size="large"
      color="primary"
      // color="secondary"
      onClick={handleClick}
      disabled={disabled || !text}
      startIcon={copied ? <DoneIcon /> : <ContentCopyIcon />}
      sx={{ minWidth: '100px' }}
    >
      {copied ? t('copyButton.copied') : t('copyButton.copy')}
    </Button>
  );
}
