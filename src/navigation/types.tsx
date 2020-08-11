import { Asset } from 'expo-media-library';
import { MemeEntity } from '../model/entity';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Memes: undefined;
  Settings: undefined;
};

export type MemesParamList = {
  Gallery: undefined;
  Picker: undefined;
  Prepare: { assets: Asset[] };
  Edit: { meme: MemeEntity };
  Details: { meme: MemeEntity };
};

export type SettingsParamList = {
  SettingsScreen: undefined;
  Debug: undefined;
};
