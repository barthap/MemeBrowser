import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import GalleryNavigator from './GalleryNavigator';
import ExploringNavigator from './ExploringNavigator';
import { TabNavParams } from './navigation.types';

const Tab = createMaterialBottomTabNavigator<TabNavParams>();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Gallery"
      component={GalleryNavigator}
      options={{
        tabBarIcon: 'image-album',
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploringNavigator}
      options={{
        tabBarIcon: 'image-search-outline',
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
