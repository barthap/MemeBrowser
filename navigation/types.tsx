import { MemeEntity } from "../model/entity";
import { Asset } from "expo-media-library";

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
  Details: { meme: MemeEntity };
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};
