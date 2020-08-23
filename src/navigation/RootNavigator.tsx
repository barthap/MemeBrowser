import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { Settings2Screen } from '../components/TestScreen';
import { RootStackParams } from './navigation.types';
import useNavHeader from '../hooks/useNavHeader';

const RootStack = createStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const header = useNavHeader();
  return (
    <RootStack.Navigator screenOptions={{ header }} headerMode="screen">
      <RootStack.Screen name="Memes" component={TabNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
      <RootStack.Screen name="MoreSettings" component={Settings2Screen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
