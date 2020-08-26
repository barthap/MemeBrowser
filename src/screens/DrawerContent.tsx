import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer, TouchableRipple, Text, Switch, Caption } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import usePreferencesContext from '../hooks/usePreferencesContext';
import AppInfo from '../core/modules/ApplicationInfo';
import { useTapToDev } from '../hooks/useDevContext';

type Props = {
  navigation: DrawerNavigationHelpers;
};
const DrawerContent = ({ navigation }: Props) => {
  const { isAutoTheme, toggleAutoTheme, toggleTheme, isDarkTheme } = usePreferencesContext();

  const tapToDev = useTapToDev();
  return (
    <View style={styles.drawerContent}>
      <Drawer.Section title="Menu">
        <DrawerItem
          icon={({ color, size }) => <MaterialCommunityIcons name="settings-outline" color={color} size={size} />}
          label="Settings"
          onPress={() => {
            navigation.navigate('Main', { screen: 'Settings' });
          }}
        />
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <TouchableRipple onPress={toggleAutoTheme}>
          <View style={styles.preference}>
            <Text>Auto Theme</Text>
            <View pointerEvents="none">
              <Switch value={isAutoTheme} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={toggleTheme} disabled={isAutoTheme}>
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={isDarkTheme} disabled={isAutoTheme} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <Drawer.Section title={AppInfo.name} style={styles.appName}>
        <Caption style={styles.appVersion} onPress={tapToDev}>
          {AppInfo.version}
        </Caption>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  appName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  appVersion: {
    marginLeft: 16,
    marginTop: -10,
  },
});

export default DrawerContent;
