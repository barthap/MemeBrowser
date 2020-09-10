import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
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
import { AppLoading } from 'expo';
import { useNavigationContainer } from './navigation/EnhancedContainer';

const Drawer = createDrawerNavigator<DrawerNavParams>();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={drawerProps => <DrawerContent navigation={drawerProps.navigation} />}>
    <Drawer.Screen name="Main" component={RootNavigator} />
  </Drawer.Navigator>
);

export default function AppMain() {
  const { theme, ...themeContext } = useAppTheme();
  const devContext = useDevContextProvider();

  const [NavigationContainer, isNavReady] = useNavigationContainer();

  if (!isNavReady) return <AppLoading />;

  return (
    <ReduxProvider store={reduxStore}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <PreferencesContext.Provider value={themeContext}>
            <DevContext.Provider value={devContext}>
              <NavigationContainer theme={theme}>
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
