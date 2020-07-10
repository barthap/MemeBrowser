import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import db from '../model/db';
import { MemeRepository } from '../model/repository';
import { useLinkProps } from '@react-navigation/native';

export default function SettingsScreen({navigation}) {

  //this effect is used only for debug purposes
  React.useEffect(() => {
    const fn = async () => {
      /*await db.reset();
      const res = await MemeRepository.getMoreLike('text');
      console.log(res);*/
    };
    fn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is settings screen</Text>
      <Text>There is nothing here yet</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Text>And this is debug area for testing snippets.</Text>
      </View>
      <Button title="Reset schema" onPress={() => db.reset(false)} />
      <Button title="Debug screen" onPress={() => navigation.navigate('Debug')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
