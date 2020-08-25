import React from 'react';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useColorScheme } from 'react-native-appearance';
import { AppThemeContext } from './usePreferencesContext';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: { ...PaperDefaultTheme.colors, ...NavigationDefaultTheme.colors },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors },
};

const THEME_KEY = 'THEME_PREFERENCES';

export default function useAppTheme(): AppThemeContext & { theme: typeof CombinedDefaultTheme } {
  const [isAutoTheme, setIsAutoTheme] = React.useState(true);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  React.useEffect(() => {
    const restoreTheme = async () => {
      try {
        const prefString = await AsyncStorage.getItem(THEME_KEY);
        const preferences = JSON.parse(prefString || '');

        if (preferences) {
          setIsDarkTheme(preferences.theme === 'dark');
          setIsAutoTheme(preferences.auto === 'yes');
        }
      } catch (e) {
        console.warn('Couldnt restore theme', e);
      }
    };

    restoreTheme();
  }, []);

  React.useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(
          THEME_KEY,
          JSON.stringify({
            theme: isDarkTheme ? 'dark' : 'light',
            auto: isAutoTheme ? 'yes' : 'no',
          }),
        );
      } catch (e) {
        console.warn('Couldnt save theme', e);
      }
    };

    saveTheme();
  }, [isDarkTheme, isAutoTheme]);

  const detectedTheme = useColorScheme();
  const shouldSetDarkTheme = isAutoTheme ? detectedTheme === 'dark' : isDarkTheme;
  const theme = shouldSetDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state

  function toggleTheme() {
    // We will pass this function to Drawer and invoke it on theme switch press
    setIsDarkTheme((isDark) => !isDark);
  }

  function toggleAutoTheme() {
    setIsAutoTheme((val) => !val);
  }

  return { isDarkTheme: shouldSetDarkTheme, isAutoTheme, theme, toggleTheme, toggleAutoTheme };
}
