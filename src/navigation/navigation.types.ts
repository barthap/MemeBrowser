import { CompositeNavigationProp, RouteProp, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

export type DrawerNavParams = {
  Main: SubNavigator<RootStackParams>;
};

export type RootStackParams = {
  Memes: undefined;
  Settings: undefined;
  MoreSettings: undefined;
};

export type TabNavParams = {
  Gallery: undefined;
  Explore: undefined;
};

export type GalleryNavParams = {
  GalleryHome: undefined;
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

export type SettingsScreenNavProps = {
  navigation: RootStackNavProp<'Settings'>;
  route: RouteProp<RootStackParams, 'Settings'>;
};

export type GalleryScreenNavProps = {
  navigation: GalleryNavProp<'GalleryHome'>;
  route: RouteProp<GalleryNavParams, 'GalleryHome'>;
};

export type ExploreScreenNavProps = {
  navigation: ExploreNavProp<'ExploreHome'>;
  route: RouteProp<ExploreNavParams, 'ExploreHome'>;
};
