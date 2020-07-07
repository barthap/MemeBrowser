import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { MemesParamList } from "../types";
import MemeGalleryScreen from "../screens/MemeGalleryScreen";
import { MemeDetailsScreen } from "../screens/MemeDetailsScreen";

const MemesStack = createStackNavigator<MemesParamList>();

export default function MemesNavigator() {
  return (
    <MemesStack.Navigator>
      <MemesStack.Screen
        name="Gallery"
        component={MemeGalleryScreen}
        options={{ headerTitle: 'Memes' }}
      />
      <MemesStack.Screen
        name="Details"
        component={MemeDetailsScreen}
      />
    </MemesStack.Navigator>
  );
}