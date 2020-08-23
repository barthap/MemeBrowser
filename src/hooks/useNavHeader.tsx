import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavParams } from '../navigation/navigation.types';
import { white } from 'react-native-paper/src/styles/colors';
import * as ReactIs from 'react-is';

export default function useNavHeader(): (props: StackHeaderProps) => JSX.Element {
  const theme = useTheme();

  return ({ scene, previous, navigation }: StackHeaderProps) => {
    const { options } = scene.descriptor;
    const titleStr = options.headerTitle ?? options.title ?? scene.route.name;
    const [title, subtitle] = titleStr.toString().split('$');

    // check if headerRight is single action or react fragment with multiple actions
    const headerFn = options.headerRight && options.headerRight({ tintColor: theme.dark ? theme.colors.text : white });
    const actions = ReactIs.isFragment(headerFn) ? (headerFn as React.ReactElement)?.props.children : headerFn;
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
        <Appbar.Content title={title} subtitle={subtitle} />
        {options.headerRight && actions}
      </Appbar.Header>
    );
  };
}
