import React from 'react';
import { StyleSheet } from 'react-native';
import { GalleryScreenNavProps } from '../navigation/navigation.types';
import { Appbar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import ThemedView from '../components/ThemedView';

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

  return (
    <ThemedView style={styles.container}>
      <Text>This section is work in progress!</Text>
      <Text>Memes go here</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
