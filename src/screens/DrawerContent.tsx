import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

type Props = { navigation: DrawerNavigationHelpers };
const DrawerContent = ({ navigation }: Props) => (
  <Drawer.Section>
    <DrawerItem
      icon={({ color, size }) => <MaterialCommunityIcons name="settings-outline" color={color} size={size} />}
      label="Settings"
      onPress={() => {
        navigation.navigate('Main', { screen: 'Settings' });
      }}
    />
  </Drawer.Section>
);

export default DrawerContent;
