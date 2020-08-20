import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryScreen from '../screens/GalleryScreen';
import { GalleryNavParams } from './navigation.types';

const GalleryStack = createStackNavigator<GalleryNavParams>();

const GalleryNavigator = () => (
  <GalleryStack.Navigator>
    <GalleryStack.Screen name="GalleryHome" component={GalleryScreen} options={{ headerTitle: 'Your memes' }} />
  </GalleryStack.Navigator>
);

export default GalleryNavigator;
