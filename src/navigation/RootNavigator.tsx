import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { Settings2Screen } from '../components/TestScreen';
import { RootStackParams } from './navigation.types';

const RootStack = createStackNavigator<RootStackParams>();

const RootNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen name="Memes" component={TabNavigator} options={{ headerShown: false }} />
    <RootStack.Screen name="Settings" component={SettingsScreen} />
    <RootStack.Screen name="MoreSettings" component={Settings2Screen} />
  </RootStack.Navigator>
);

export default RootNavigator;
