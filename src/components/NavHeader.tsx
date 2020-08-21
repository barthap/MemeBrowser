import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavParams } from '../navigation/navigation.types';

export function createNavHeader() {
  const theme = useTheme();

  return ({ scene, previous, navigation }: StackHeaderProps) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
      <Appbar.Header>
        {previous ? (
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        ) : (navigation as any).openDrawer ? (
          <Appbar.Action
            icon="menu"
            onPress={() => ((navigation as any) as DrawerNavigationProp<DrawerNavParams>).openDrawer()}
          />
        ) : null}
        <Appbar.Content title={title} />
        {options.headerRight && options.headerRight({ tintColor: theme.colors.text })}
      </Appbar.Header>
    );
  };
}
