import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryScreen from '../screens/GalleryScreen';
import { GalleryNavParams } from './navigation.types';
import useNavHeader from '../hooks/useNavHeader';
import ImagePickerScreen from '../screens/ImagePickerScreen';

const GalleryStack = createStackNavigator<GalleryNavParams>();

const GalleryNavigator = () => {
  const header = useNavHeader();
  return (
    <GalleryStack.Navigator screenOptions={{ header }} headerMode="screen">
      <GalleryStack.Screen name="GalleryHome" component={GalleryScreen} options={{ headerTitle: 'Your memes' }} />
      <GalleryStack.Screen name="Picker" component={ImagePickerScreen} options={{ headerTitle: 'Add memes' }} />
    </GalleryStack.Navigator>
  );
};
export default GalleryNavigator;
