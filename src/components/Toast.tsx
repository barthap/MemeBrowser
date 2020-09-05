import React from 'react';
import { Snackbar, useTheme } from 'react-native-paper';
import useTypedSelector from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { dismissToast } from '../core/redux/ToastSlice';
import usePreferencesContext from '../hooks/usePreferencesContext';

const infoTheme = (theme: ReactNativePaper.Theme, isDark: boolean) =>
  isDark
    ? { ...theme, colors: { ...theme.colors, onSurface: '#95D4FF', surface: '#024aff', accent: '#024aff' } }
    : theme;

const errorTheme = (theme: ReactNativePaper.Theme, _isDark: boolean) => ({
  ...theme,
  colors: { ...theme.colors, onSurface: '#ff8273', surface: '#770300', accent: '#770300' },
});

const successTheme = (theme: ReactNativePaper.Theme, _isDark: boolean) => ({
  ...theme,
  colors: { ...theme.colors, onSurface: '#8dff71', surface: '#007701', accent: '#007701' },
});

export type ToastStyle = 'info' | 'error' | 'success';

function getTheme(styleName: ToastStyle, theme: ReactNativePaper.Theme, isDark: boolean): ReactNativePaper.Theme {
  switch (styleName) {
    case 'error':
      return errorTheme(theme, isDark);
    case 'info':
      return infoTheme(theme, isDark);
    case 'success':
      return successTheme(theme, isDark);
  }
}

export default function Toast() {
  const state = useTypedSelector(state => state.toast);
  const { isDarkTheme } = usePreferencesContext();
  const theme = useTheme();
  const dispatch = useDispatch();

  const customTheme = getTheme(state.alertStyle, theme, isDarkTheme);

  return (
    <Snackbar
      visible={state.visible}
      theme={customTheme}
      onDismiss={() => dispatch(dismissToast())}
      action={
        state.dismissible
          ? {
              label: 'X',
              onPress: () => {
                // Do something
              },
            }
          : undefined
      }
      duration={state.duration || Number.POSITIVE_INFINITY}
    >
      {state.message}
    </Snackbar>
  );
}
