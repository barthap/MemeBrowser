import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryScreen from '../screens/GalleryScreen';
import { GalleryNavParams } from './navigation.types';
import { createNavHeader } from '../components/NavHeader';

const GalleryStack = createStackNavigator<GalleryNavParams>();

const GalleryNavigator = () => {
  return (
    <GalleryStack.Navigator
      screenOptions={{
        header: createNavHeader(),
      }}
    >
      <GalleryStack.Screen name="GalleryHome" component={GalleryScreen} options={{ headerTitle: 'Your memes' }} />
    </GalleryStack.Navigator>
  );
};
export default GalleryNavigator;
