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

const Drawer = createDrawerNavigator<DrawerNavParams>();

type DrawerNavigatorProps = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
  isAutoTheme: boolean;
  toggleAutoTheme: () => void;
};
const DrawerNavigator = ({ toggleTheme, isDarkTheme, isAutoTheme, toggleAutoTheme }: DrawerNavigatorProps) => (
  <Drawer.Navigator
    drawerContent={(drawerProps) => (
      <DrawerContent
        navigation={drawerProps.navigation}
        toggleTheme={toggleTheme}
        isDarkTheme={isDarkTheme}
        isAutoTheme={isAutoTheme}
        toggleAutoTheme={toggleAutoTheme}
      />
    )}
  >
    <Drawer.Screen name="Main" component={RootNavigator} />
  </Drawer.Navigator>
);

export default function AppMain() {
  const { isDarkTheme, isAutoTheme, toggleAutoTheme, theme, toggleTheme } = useAppTheme();

  return (
    <ReduxProvider store={reduxStore}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <DrawerNavigator
              isDarkTheme={isDarkTheme}
              toggleTheme={toggleTheme}
              toggleAutoTheme={toggleAutoTheme}
              isAutoTheme={isAutoTheme}
            />
            <StatusBar style={isDarkTheme ? 'light' : 'light'} />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
