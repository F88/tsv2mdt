import { Stack } from '@mui/material';
import { type ComponentProps } from 'react';
import { SelectLanguageButtonGroup } from './SelectLanguageButtonGroup.jsx';
import { SelectNextLanguage } from './SelectNextLanguage.jsx';

type Props = Pick<ComponentProps<typeof Stack>, 'direction'>;

export function Language(props: Props) {
  return (
    <>
      <Stack direction={props.direction} spacing={0}>
        <SelectNextLanguage />
        <SelectLanguageButtonGroup />
      </Stack>
    </>
  );
}
