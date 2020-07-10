import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsParamList } from "./types";
import SettingsScreen from "../screens/SettingsScreen";
import DebugScreen from '../screens/DebugScreen';

const SettingsStack = createStackNavigator<SettingsParamList>();

export default function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
      <SettingsStack.Screen
        name="Debug"
        component={DebugScreen}
        options={{ headerTitle: 'Debug' }}
      />
    </SettingsStack.Navigator>
  );
}