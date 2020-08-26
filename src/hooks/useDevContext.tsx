import React, { Dispatch, SetStateAction /*, ProviderProps, ReactNode*/ } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const DEV_KEY = '_DEV';
const DEV_VAL = 'foobar';

export const DevContext = React.createContext(([] as unknown) as [boolean, Dispatch<SetStateAction<boolean>>]);

export function useDevContextProvider() {
  const devContext = React.useState(false);

  const readDevValue = async () => {
    try {
      const [, setDev] = devContext;
      const val = await AsyncStorage.getItem(DEV_KEY);
      setDev(val === DEV_VAL);
    } catch (e) {
      // ignore error
    }
  };
  React.useEffect(() => {
    readDevValue();
  }, []);

  return devContext;

  // This will not work as expected because memo() doesn't work for children
  /*return ({ children }: { children: JSX.Element }) => (
    <DevContext.Provider value={devContext}>{children}</DevContext.Provider>
  );*/
}

export function useDevContext() {
  const [isDev, setDev] = React.useContext(DevContext);

  const disableDev = () => {
    alert('You are no longer a developer :/');
    setDev(false);
    AsyncStorage.removeItem(DEV_KEY);
  };
  return { isDev, disableDev };
}

export function useTapToDev() {
  const [dev, setDev] = React.useContext(DevContext);
  const [tapCount, setTap] = React.useState(0);

  React.useEffect(() => {
    console.log('Tapped:', tapCount);
    if (!dev && tapCount >= 7) {
      setDev(true);
      AsyncStorage.setItem(DEV_KEY, DEV_VAL);
      alert('You are now a developer!');
    }
  }, [tapCount]);

  return () => setTap((tap) => tap + 1);
}
