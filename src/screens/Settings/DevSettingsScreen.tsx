import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Divider, List, Subheading, Surface } from 'react-native-paper';
import ScrollView from '../../components/ThemedScrollView';
import { useDevContext } from '../../hooks/useDevContext';
import MonoText from '../../components/MonoText';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-community/async-storage';
import { Zocial } from '@expo/vector-icons';

const applicationFilter = (key: any, val: any) => typeof val !== 'function' && key !== 'ApplicationReleaseType';
const ShowConstants = JSON.stringify(Constants, (key, val) => (key === 'systemFonts' ? undefined : val), 2);
const ShowApplication = JSON.stringify(Application, (key, val) => (applicationFilter(key, val) ? val : undefined), 2);
const convertStorage = (vals: any[][]) => vals.reduce((prev, arr) => ({ ...prev, [arr[0]]: arr[1] }), {});

export default function DevSettingsScreen() {
  const { disableDev } = useDevContext();

  const [storageData, setStorage] = React.useState(null as any);
  const refreshStorage = async () => {
    setStorage('...');
    const keys = await AsyncStorage.getAllKeys();
    const vals = await AsyncStorage.multiGet(keys);
    setStorage(JSON.stringify(convertStorage(vals), null, 2));
  };
  React.useEffect(() => {
    refreshStorage();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <Subheading>Developer settings!</Subheading>
        <Button onPress={disableDev}>Stop being a developer</Button>
      </Surface>
      <Divider />
      <List.Accordion title="Constants values">
        <MonoText>{ShowConstants}</MonoText>
      </List.Accordion>
      <Divider />
      <List.Accordion title="Application values">
        <MonoText>{ShowApplication}</MonoText>
      </List.Accordion>
      <Divider />
      <List.Accordion title="AsyncStorage content">
        <Button onPress={refreshStorage}>Refresh</Button>
        <MonoText>{storageData}</MonoText>
      </List.Accordion>
      <Divider />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
