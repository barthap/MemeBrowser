import React from 'react';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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

const THEME_KEY = 'THEME';

export default function useAppTheme() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  React.useEffect(() => {
    const restoreTheme = async () => {
      try {
        const prefString = await AsyncStorage.getItem(THEME_KEY);
        const preferences = JSON.parse(prefString || '');

        if (preferences) {
          setIsDarkTheme(preferences.theme === 'dark');
        }
      } catch (e) {
        // ignore error
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
          }),
        );
      } catch (e) {
        // ignore error
      }
    };

    saveTheme();
  }, [isDarkTheme]);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state

  function toggleTheme() {
    // We will pass this function to Drawer and invoke it on theme switch press
    setIsDarkTheme((isDark) => !isDark);
  }

  return { isDarkTheme, theme, toggleTheme };
}
