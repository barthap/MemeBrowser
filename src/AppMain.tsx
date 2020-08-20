import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import DrawerContent from './screens/DrawerContent';
import { DrawerNavParams } from './navigation/navigation.types';

const Drawer = createDrawerNavigator<DrawerNavParams>();
const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent navigation={props.navigation} />}>
    <Drawer.Screen name="Main" component={RootNavigator} />
  </Drawer.Navigator>
);

export default function AppMain() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <DrawerNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
