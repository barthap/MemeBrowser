import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TestScreen({ name, children }: { name: string; children?: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Text>This is {name} screen!</Text>
      {children}
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

export const Settings2Screen = () => <TestScreen name="More settings" />;
