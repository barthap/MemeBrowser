import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MemesParamList } from './types';
import MemeGalleryScreen from '../screens/MemeGalleryScreen';
import MemeDetailsScreen from '../screens/MemeDetailsScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import PrepareMemesScreen from '../screens/PrepareMemesScreen';
import EditMemeScreen from '../screens/EditMemeScreen';

const MemesStack = createStackNavigator<MemesParamList>();

export default function MemesNavigator() {
  return (
    <MemesStack.Navigator>
      <MemesStack.Screen name="Gallery" component={MemeGalleryScreen} options={{ headerTitle: 'Memes' }} />
      <MemesStack.Screen name="Picker" component={ImagePickerScreen} options={{ headerTitle: 'Add memes' }} />
      <MemesStack.Screen name="Prepare" component={PrepareMemesScreen} options={{ headerTitle: 'Prepare memes' }} />
      <MemesStack.Screen name="Edit" component={EditMemeScreen} options={{ headerTitle: 'Edit meme' }} />
      <MemesStack.Screen name="Details" component={MemeDetailsScreen} />
    </MemesStack.Navigator>
  );
}
