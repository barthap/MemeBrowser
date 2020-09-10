import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, InitialState } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import DrawerContent from './screens/DrawerContent';
import { DrawerNavParams } from './navigation/navigation.types';
import useAppTheme from './hooks/useAppTheme';
import { Provider as ReduxProvider } from 'react-redux';
import reduxStore from './core/redux';
import { PreferencesContext } from './hooks/usePreferencesContext';
import { useDevContextProvider, DevContext } from './hooks/useDevContext';
import AsyncStorage from '@react-native-community/async-storage';
import { AppLoading } from 'expo';

const Drawer = createDrawerNavigator<DrawerNavParams>();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={drawerProps => <DrawerContent navigation={drawerProps.navigation} />}>
    <Drawer.Screen name="Main" component={RootNavigator} />
  </Drawer.Navigator>
);

const NAVIAGATION_STATE_KEY = 'NAVIGATION_STATE';

const useDevNavigationState = () => {
  const [isNavReady, setNavReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateStr = await AsyncStorage.getItem(NAVIAGATION_STATE_KEY);
        const state = savedStateStr ? JSON.parse(savedStateStr) : undefined;
        setInitialState(state);
      } finally {
        setNavReady(true);
      }
    };

    if (!isNavReady) restoreState();
  }, [isNavReady]);

  const onStateChange = useCallback(state => AsyncStorage.setItem(NAVIAGATION_STATE_KEY, JSON.stringify(state)), []);

  return { isNavReady, initialNavState: initialState, onNavStateChange: onStateChange };
};

export default function AppMain() {
  const { theme, ...themeContext } = useAppTheme();
  const devContext = useDevContextProvider();

  const { isNavReady, initialNavState, onNavStateChange } = useDevNavigationState();

  if (!isNavReady) return <AppLoading />;

  return (
    <ReduxProvider store={reduxStore}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <PreferencesContext.Provider value={themeContext}>
            <DevContext.Provider value={devContext}>
              <NavigationContainer theme={theme} initialState={initialNavState} onStateChange={onNavStateChange}>
                <DrawerNavigator />
                <StatusBar style={themeContext.isDarkTheme ? 'light' : 'light'} />
              </NavigationContainer>
            </DevContext.Provider>
          </PreferencesContext.Provider>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
