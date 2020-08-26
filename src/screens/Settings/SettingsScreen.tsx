import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import ScrollView from '../../components/ThemedScrollView';
import * as Linking from 'expo-linking';
import { SettingsScreenNavProps } from '../../navigation/navigation.types';
import { useDevContext } from '../../hooks/useDevContext';

const Icon = (name: string) => (props: any) => <List.Icon {...props} icon={name} />;

export default function SettingsScreen({ navigation }: SettingsScreenNavProps) {
  const { isDev } = useDevContext();
  return (
    <ScrollView style={styles.container}>
      <List.Section title="Application">
        <List.Item
          title="General settings"
          description="MemeBrowser settings"
          left={Icon('settings')}
          onPress={() => navigation.navigate('AppSettings')}
        />
        <List.Item
          title="Device settings"
          description="Opens your device system settings"
          left={Icon('cellphone-settings')}
          onPress={() => Linking.openSettings()}
        />
      </List.Section>
      {isDev && (
        <List.Section title="Development">
          <List.Item
            title="Developer options"
            description="Hope you know what you're doing!"
            left={Icon('dev-to')}
            onPress={() => navigation.navigate('DevSettings')}
          />
        </List.Section>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
