import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsParamList } from "./types";
import SettingsScreen from "../screens/SettingsScreen";

const SettingsStack = createStackNavigator<SettingsParamList>();

export default function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsStack.Navigator>
  );
}