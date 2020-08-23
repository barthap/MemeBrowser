import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import { ExploreNavParams } from './navigation.types';
import useNavHeader from '../hooks/useNavHeader';

const ExploreStack = createStackNavigator<ExploreNavParams>();

const ExploringNavigator = () => {
  const header = useNavHeader();
  return (
    <ExploreStack.Navigator screenOptions={{ header }}>
      <ExploreStack.Screen name="ExploreHome" component={ExploreScreen} options={{ headerTitle: 'Explore' }} />
    </ExploreStack.Navigator>
  );
};

export default ExploringNavigator;
