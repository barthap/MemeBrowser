import * as React from 'react';
import { FAB, Text } from 'react-native-paper';
import { PrepareScreenNavProps } from '../../navigation/navigation.types';
import { StyleSheet, Dimensions, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { MemeFormComponent } from '../../components/MemeForm';
import { IImage, MemeEntity, MemeType } from '../../core/interafaces';
import ThemedView from '../../components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addMemes } from '../../core/redux/MemeSlice';

const createRefMap = (images: IImage[]) => images.map(() => React.createRef<MemeFormComponent>());

const mapImgToMeme = (img: IImage): MemeEntity => ({ ...img, title: '', content: '', type: MemeType.Gallery });
const createMemeMap = (images: IImage[]) => images.map(mapImgToMeme);

const { width } = Dimensions.get('window');
const abs = (x: number) => (x >= 0 ? x : -x);

type OnScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

export default function PrepareMemesScreen({ navigation, route }: PrepareScreenNavProps) {
  const { images } = route.params;
  const refs = React.useMemo(() => createRefMap(images), [images]);
  const memes = React.useMemo(() => createMemeMap(images), [images]);
  const [active, setActive] = React.useState(0);

  const onScrollEvent = ({
    nativeEvent: {
      contentOffset: { x },
    },
  }: OnScrollEvent) => {
    if (x % width === 0) {
      const idx = x / width;
      setActive(active => (active !== idx ? idx : active));
      // console.log(x / width);
    }
  };

  const dispatch = useDispatch();
  const save = () => {
    dispatch(addMemes(memes));
    navigation.popToTop();
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        disableIntervalMomentum
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        onScroll={onScrollEvent}
        onScrollBeginDrag={() => refs[active].current?.unfocus()}
        scrollEventThrottle={2}
      >
        {memes.map((meme, idx) => {
          if (abs(active - idx) > 1) {
            console.log('View', idx, 'inactive');
            return <View key={idx} style={{ width }} />;
          }
          console.log('View', idx, 'active');
          return (
            <MemeFormComponent
              header={`Meme ${idx + 1} of ${memes.length}`}
              ref={refs[idx]}
              key={idx}
              meme={meme}
              onChange={meme => (memes[idx] = meme)}
            />
          );
        })}
      </ScrollView>
      <ThemedView style={{ height: 80 }}>
        <Text>
          Meme {active + 1} of {memes.length}
        </Text>
      </ThemedView>

      <FAB label="Save" icon="check-bold" style={styles.fab} onPress={save} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    left: '30%',
    right: '30%',
  },
});
