import React from 'react';
import { StyleSheet } from 'react-native';
import { GalleryScreenNavProps } from '../navigation/navigation.types';
import { Appbar } from 'react-native-paper';
import { ImageGrid } from '../components/ImageGrid';
import useTypedSelector from '../hooks/useTypedSelector';
export default function GalleryScreen({ navigation }: GalleryScreenNavProps) {
  navigation.setOptions({
    headerTitle: 'Your memes',
    headerRight: ({ tintColor }) => (
      <>
        <Appbar.Action icon="magnify" color={tintColor} />
        <Appbar.Action icon="image-plus" onPress={() => navigation.navigate('Picker')} color={tintColor} />
      </>
    ),
  });

  const memes = useTypedSelector((state) => state.memes);

  return <ImageGrid memes={memes} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
