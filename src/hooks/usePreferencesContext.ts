import React from 'react';

export interface AppThemeContext {
  isDarkTheme: boolean;
  isAutoTheme: boolean;
  toggleTheme: () => void;
  toggleAutoTheme: () => void;
}

export type AppPreferences = AppThemeContext;

export const PreferencesContext = React.createContext({} as AppPreferences);

const usePreferencesContext = () => React.useContext(PreferencesContext);
export default usePreferencesContext;
