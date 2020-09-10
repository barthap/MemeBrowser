import React from 'react';
import { StyleSheet } from 'react-native';
import { GalleryScreenNavProps } from '../../navigation/navigation.types';
import { Appbar } from 'react-native-paper';
import { ImageGrid } from '../../components/ImageGrid';
import useTypedSelector from '../../hooks/useTypedSelector';
import View from '../../components/ThemedView';
import { Text } from 'react-native-paper';
import { MemeEntity } from '../../core/interafaces';
import Toast from '../../components/Toast';

export default function GalleryScreen({ navigation }: GalleryScreenNavProps) {
  navigation.setOptions({
    headerTitle: 'Your memes',
    headerRight: ({ tintColor }) => (
      <>
        <Appbar.Action icon="magnify" color={tintColor} />
        <Appbar.Action icon="image-plus" onPress={() => navigation.navigate('Picker')} color={tintColor} />
      </>
    ),
  });

  const onClick = (meme: MemeEntity) => {
    navigation.navigate('Details', { meme });
  };

  const memes = useTypedSelector(state => state.memes.present);
  const noItems = memes.length === 0;

  return (
    <View style={styles.container}>
      {noItems ? <NoItemsMessage /> : <ImageGrid memes={memes} onMemePress={onClick} />}
      <Toast />
    </View>
  );
}

const NoItemsMessage = () => (
  <View style={styles.messageContainer}>
    <Text style={styles.messageText}>Meme list is empty!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 15,
  },
  refreshIcon: {
    paddingTop: 20,
    fontSize: 50,
  },
  secondaryText: {
    fontSize: 12,
    color: '#555',
  },
  icon: {
    paddingRight: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 100,
  },
});
