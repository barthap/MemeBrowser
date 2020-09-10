import React from 'react';
import { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';

const ThemedScrollView: React.FunctionComponent<ScrollViewProps> = (props: ScrollViewProps) => {
  const theme = useTheme();
  return <ScrollView {...props} style={[props.style, { backgroundColor: theme.colors.background }]} />;
};

export default ThemedScrollView;
