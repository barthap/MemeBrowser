import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer, TouchableRipple, Text, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

type Props = {
  navigation: DrawerNavigationHelpers;
  toggleTheme: () => void;
  isDarkTheme: boolean;
};
const DrawerContent = ({ navigation, toggleTheme, isDarkTheme }: Props) => (
  <View style={styles.drawerContent}>
    <Drawer.Section>
      <DrawerItem
        icon={({ color, size }) => <MaterialCommunityIcons name="settings-outline" color={color} size={size} />}
        label="Settings"
        onPress={() => {
          navigation.navigate('Main', { screen: 'Settings' });
        }}
      />
    </Drawer.Section>
    <Drawer.Section title="Preferences">
      <TouchableRipple onPress={toggleTheme}>
        <View style={styles.preference}>
          <Text>Dark Theme</Text>
          <View pointerEvents="none">
            <Switch value={isDarkTheme} />
          </View>
        </View>
      </TouchableRipple>
    </Drawer.Section>
  </View>
);

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
});

export default DrawerContent;
