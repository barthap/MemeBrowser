import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import ThemedView from '../components/ThemedView';
import { useDevContext } from '../hooks/useDevContext';

export default function DevSettingsScreen() {
  const { disableDev } = useDevContext();
  return (
    <ThemedView style={styles.container}>
      <Text>This section is work in progress!</Text>
      <Button onPress={disableDev}>Stop being a developer</Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
