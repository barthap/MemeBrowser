import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { Settings2Screen } from '../components/TestScreen';
import { RootStackParams } from './navigation.types';
import useNavHeader from '../hooks/useNavHeader';
import AppSettingsScreen from '../screens/AppSettingsScreen';
import DevSettingsScreen from '../screens/DevSettingsScreen';

const RootStack = createStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const header = useNavHeader();
  return (
    <RootStack.Navigator screenOptions={{ header }} headerMode="screen">
      <RootStack.Screen name="Memes" component={TabNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
      <RootStack.Screen name="AppSettings" component={AppSettingsScreen} options={{ headerTitle: 'App Settings' }} />
      <RootStack.Screen name="DevSettings" component={DevSettingsScreen} options={{ headerTitle: 'Dev Settings' }} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
