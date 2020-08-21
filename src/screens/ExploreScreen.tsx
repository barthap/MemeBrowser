import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import ThemedView from '../components/ThemedView';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text>This section is work in progress!</Text>
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
