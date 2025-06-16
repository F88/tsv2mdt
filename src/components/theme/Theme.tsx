import { Stack } from '@mui/material';
import { type ComponentProps } from 'react';
import { SelectThemeButtonGroup } from './SelectThemeButtonGroup.jsx';

type Props = Pick<ComponentProps<typeof Stack>, 'direction'>;

export function Theme(props: Props) {
  return (
    <>
      <Stack
        //
        order={1}
        direction={props.direction}
        spacing={4}
      >
        <SelectThemeButtonGroup />
      </Stack>
    </>
  );
}
