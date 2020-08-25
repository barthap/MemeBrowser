import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import DrawerContent from './screens/DrawerContent';
import { DrawerNavParams } from './navigation/navigation.types';
import useAppTheme from './hooks/useAppTheme';
import { Provider as ReduxProvider } from 'react-redux';
import reduxStore from './core/redux';
import { PreferencesContext } from './hooks/usePreferencesContext';

const Drawer = createDrawerNavigator<DrawerNavParams>();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(drawerProps) => <DrawerContent navigation={drawerProps.navigation} />}>
    <Drawer.Screen name="Main" component={RootNavigator} />
  </Drawer.Navigator>
);

export default function AppMain() {
  const { theme, ...themeContext } = useAppTheme();

  return (
    <ReduxProvider store={reduxStore}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <PreferencesContext.Provider value={themeContext}>
            <NavigationContainer theme={theme}>
              <DrawerNavigator />
              <StatusBar style={themeContext.isDarkTheme ? 'light' : 'light'} />
            </NavigationContainer>
          </PreferencesContext.Provider>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
