import React from 'react';
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import { light } from './light';
import { dark } from './dark';

type Theme = 'light' | 'dark';

type ThemeContext = [Theme, (newTheme?: Theme) => void];

const themeSetterError = () => {
  throw new Error('You are trying to call setTheme outside of ThemeProvider');
};

const themeContext = React.createContext<ThemeContext>([
  'light',
  themeSetterError,
]);

themeContext.displayName = 'ThemeContext';

const themes = { light, dark };

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>('light');
  const toggleTheme = React.useCallback((newTheme?: Theme) => {
    if (newTheme) setTheme(newTheme);
    else setTheme((old) => (old === 'light' ? 'dark' : 'light'));
  }, []);
  return (
    <MuiThemeProvider theme={themes[theme]}>
      <themeContext.Provider value={[theme, toggleTheme]}>
        <CssBaseline />
        {children}
      </themeContext.Provider>
    </MuiThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export const useThemeMode = () => React.useContext(themeContext);
