import * as React from 'react';
import { StyleSheet  } from 'react-native';

import { Text, View } from '../components/Themed';

export default function DebugScreen() {

  return (
    <View style={styles.container}>
      <Text>Put debug/demo components here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
