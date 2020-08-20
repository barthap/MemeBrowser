import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GalleryScreenNavProps } from '../navigation/navigation.types';

export default function GalleryScreen({ navigation }: GalleryScreenNavProps) {
  navigation.setOptions({
    headerTitle: 'Your memes',
  });
  return (
    <View style={styles.container}>
      <Text>This section is work in progress!</Text>
      <Text>Memes go here</Text>
    </View>
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
