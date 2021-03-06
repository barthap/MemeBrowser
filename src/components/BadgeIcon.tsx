import * as React from 'react';
import { Animated, StyleSheet, StyleProp, TextStyle } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import color from 'color';
import { black, white } from 'react-native-paper/src/styles/colors';
import { withTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const defaultSize = 20;

type Props = React.ComponentProps<typeof Animated.Text> & {
  /**
   * Whether the badge is visible
   */
  visible: boolean;
  /**
   * MaterialCommunityIcons name.
   */
  icon: string;
  /**
   * Size of the `Badge`.
   */
  size?: number;
  style?: StyleProp<TextStyle>;
  ref?: React.RefObject<typeof Animated.Text>;
  /**
   * @optional
   */
  theme: ReactNativePaper.Theme;
};

type State = {
  opacity: Animated.Value;
};

class BadgeIcon extends React.Component<Props, State> {
  static defaultProps = {
    visible: true,
    size: defaultSize,
  };

  state = {
    opacity: new Animated.Value(this.props.visible ? 1 : 0),
  };

  componentDidUpdate(prevProps: Props) {
    const {
      visible,
      theme: {
        animation: { scale },
      },
    } = this.props;

    if (visible !== prevProps.visible) {
      Animated.timing(this.state.opacity, {
        toValue: visible ? 1 : 0,
        duration: 150 * scale,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    const {
      icon,
      size = defaultSize,
      style,
      theme,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      visible,
      ...rest
    } = this.props;
    const { opacity } = this.state;

    const { backgroundColor = theme.colors.backdrop, ...restStyle } = StyleSheet.flatten(style) || {};
    const textColor = color(backgroundColor).isLight() ? black : white;

    const borderRadius = size / 2;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Animated.Text
        numberOfLines={1}
        style={[
          {
            opacity,
            backgroundColor,
            color: textColor,
            fontSize: size * 0.5,
            ...theme.fonts.regular,
            lineHeight: size,
            height: size,
            minWidth: size,
            borderRadius,
          },
          styles.container,
          restStyle,
        ]}
        {...rest}
      >
        <MaterialCommunityIcons name={icon} color={textColor} />
      </Animated.Text>
    );
  }
}

export default withTheme(BadgeIcon);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
});
