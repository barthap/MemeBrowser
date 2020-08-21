import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import { ExploreNavParams } from './navigation.types';
import { createNavHeader } from '../components/NavHeader';

const ExploreStack = createStackNavigator<ExploreNavParams>();

const ExploringNavigator = () => (
  <ExploreStack.Navigator
    screenOptions={{
      header: createNavHeader(),
    }}
  >
    <ExploreStack.Screen name="ExploreHome" component={ExploreScreen} options={{ headerTitle: 'Explore' }} />
  </ExploreStack.Navigator>
);

export default ExploringNavigator;
