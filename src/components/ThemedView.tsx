import React from 'react';
import { ViewProps, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const ThemedView: React.FunctionComponent<ViewProps> = (props: ViewProps) => {
  const theme = useTheme();
  return <View {...props} style={[props.style, { backgroundColor: theme.colors.background }]} />;
};

export default ThemedView;
