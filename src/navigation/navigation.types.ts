import { CompositeNavigationProp, RouteProp, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { MemeEntity, IImage } from '../core/interafaces';

export type DrawerNavParams = {
  Main: SubNavigator<RootStackParams>;
};

export type RootStackParams = {
  Memes: undefined;
  Settings: undefined;
  AppSettings: undefined;
  DevSettings: undefined;
};

export type TabNavParams = {
  Gallery: undefined;
  Explore: undefined;
};

export type GalleryNavParams = {
  GalleryHome: undefined;
  Picker: undefined;
  Details: { meme: MemeEntity };
  Prepare: { images: IImage[] };
};

export type ExploreNavParams = {
  ExploreHome: undefined;
};

type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K] };
}[keyof T];

type DrawerNavProp = DrawerNavigationProp<DrawerNavParams, 'Main'>;

export type DrawerNavProps = {
  navigation: DrawerNavProp;
};

type RootStackNavProp<T extends keyof RootStackParams> = CompositeNavigationProp<
  StackNavigationProp<RootStackParams, T>,
  DrawerNavProp
>;

type TabNavProp<T extends keyof TabNavParams> = CompositeNavigationProp<
  MaterialBottomTabNavigationProp<TabNavParams, T>,
  RootStackNavProp<'Memes'>
>;

type GalleryNavProp<T extends keyof GalleryNavParams> = CompositeNavigationProp<
  StackNavigationProp<GalleryNavParams, T>,
  TabNavProp<'Gallery'>
>;

type ExploreNavProp<T extends keyof ExploreNavParams> = CompositeNavigationProp<
  StackNavigationProp<ExploreNavParams, T>,
  TabNavProp<'Explore'>
>;

// Root Navigator Screens

export type SettingsScreenNavProps = {
  navigation: RootStackNavProp<'Settings'>;
  route: RouteProp<RootStackParams, 'Settings'>;
};

export type AppSettingsScreenNavProps = {
  navigation: RootStackNavProp<'AppSettings'>;
  route: RouteProp<RootStackParams, 'AppSettings'>;
};

export type DevSettingsScreenNavProps = {
  navigation: RootStackNavProp<'DevSettings'>;
  route: RouteProp<RootStackParams, 'DevSettings'>;
};

/// Gallery Navigator Screens

export type GalleryScreenNavProps = {
  navigation: GalleryNavProp<'GalleryHome'>;
  route: RouteProp<GalleryNavParams, 'GalleryHome'>;
};

export type PickerScreenNavProps = {
  navigation: GalleryNavProp<'Picker'>;
  route: RouteProp<GalleryNavParams, 'Picker'>;
};

export type DetailsScreenNavProps = {
  navigation: GalleryNavProp<'Details'>;
  route: RouteProp<GalleryNavParams, 'Details'>;
};

export type PrepareScreenNavProps = {
  navigation: GalleryNavProp<'Prepare'>;
  route: RouteProp<GalleryNavParams, 'Prepare'>;
};

// Explore Navigator Screens

export type ExploreScreenNavProps = {
  navigation: ExploreNavProp<'ExploreHome'>;
  route: RouteProp<ExploreNavParams, 'ExploreHome'>;
};
