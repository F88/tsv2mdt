import { AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { Language } from '../i18n/Language.jsx';
import { Theme } from '../theme/Theme.jsx';

export const AppBar = () => {
  return (
    <MuiAppBar
      position="static"
      variant="outlined"
      color="default"
      // color="primary"
    >
      <Toolbar
        // variant="dense"
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Language
          direction="row"
          // direction="row-reverse"
        />
        <Theme
          direction="row"
          // direction="row-reverse"
        />
      </Toolbar>
    </MuiAppBar>
  );
};
