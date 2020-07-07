import { MemeEntity } from "../model/entity";

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
  Details: { meme: MemeEntity };
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};
