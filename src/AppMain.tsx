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

type DrawerNavigatorProps = { toggleTheme: () => void; isDarkTheme: boolean };
const DrawerNavigator = ({ toggleTheme, isDarkTheme }: DrawerNavigatorProps) => (
  <Drawer.Navigator
    drawerContent={(drawerProps) => (
      <DrawerContent navigation={drawerProps.navigation} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
    )}
  >
    <Drawer.Screen name="Main" component={RootNavigator} />
  </Drawer.Navigator>
);

export default function AppMain() {
  const { isDarkTheme, theme, toggleTheme } = useAppTheme();

  return (
    <ReduxProvider store={reduxStore}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <DrawerNavigator isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            <StatusBar style={isDarkTheme ? 'inverted' : 'light'} />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
