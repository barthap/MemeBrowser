import * as React from 'react';
import {
  NavigationContainer,
  InitialState,
  NavigationContainerProps,
  Theme,
  LinkingOptions,
  DocumentTitleOptions,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useCallback, useEffect, useState } from 'react';

const NAVIAGATION_STATE_KEY = 'NAVIGATION_STATE';

const useDevNavigationState = () => {
  const [isNavReady, setNavReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateStr = await AsyncStorage.getItem(NAVIAGATION_STATE_KEY);
        const state = savedStateStr ? JSON.parse(savedStateStr) : undefined;
        setInitialState(state);
      } finally {
        setNavReady(true);
      }
    };

    if (!isNavReady) restoreState();
  }, [isNavReady]);

  const onStateChange = useCallback(state => AsyncStorage.setItem(NAVIAGATION_STATE_KEY, JSON.stringify(state)), []);

  return { isNavReady, initialState, onStateChange };
};

type Props = NavigationContainerProps & {
  theme?: Theme;
  linking?: LinkingOptions;
  fallback?: React.ReactNode;
  documentTitle?: DocumentTitleOptions;
  onReady?: () => void;
};
export const useNavigationContainer: () => [(props: Props) => JSX.Element, boolean] = () => {
  const { isNavReady, initialState, onStateChange } = useDevNavigationState();

  return [
    props => <NavigationContainer initialState={initialState} onStateChange={onStateChange} {...props} />,
    isNavReady,
  ];
};
