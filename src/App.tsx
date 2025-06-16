import { AppBar } from './components/appbar/AppBar.jsx';
import { LanguageContextProvider } from './contexts/LanguageContextProvider.jsx';
import { MuiThemeProvider } from './contexts/MuiThemeProvider.jsx';
import { ThemeContextProvider } from './contexts/ThemeContextProvider.jsx';
import { TsvConverterContainer } from './features/TsvConverterContainer.jsx';

function App() {
  return (
    <LanguageContextProvider>
      <ThemeContextProvider>
        <MuiThemeProvider>
          <AppBar />
          <TsvConverterContainer />
        </MuiThemeProvider>
      </ThemeContextProvider>
    </LanguageContextProvider>
  );
}

export default App;
