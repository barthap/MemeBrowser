import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from 'expo-linking';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SelectableImageGrid from '../components/SelectableImageGrid';
import { useCameraRoll } from '../hooks/useCameraRoll';
import View from '../components/ThemedView';
import { Text, Button, FAB } from 'react-native-paper';
import { PickerScreenNavProps } from '../navigation/navigation.types';
import { MemeType } from '../core/interafaces';
import { useDispatch } from 'react-redux';
import { addMemes } from '../core/redux/MemeSlice';

export default function ImagePickerScreen(props: PickerScreenNavProps) {
  const camRoll = useCameraRoll();
  const dispatch = useDispatch();
  const [items, setItems] = React.useState<MediaLibrary.Asset[]>([]);

  const handleSelected = (selectedItems: MediaLibrary.Asset[]) => {
    setItems(selectedItems);
    props.navigation.setOptions({
      headerTitle: `Add Memes$${selectedItems.length} items selected`,
    });
  };

  const noItems = camRoll.images.length === 0 && !camRoll.isRefreshing;

  if (!camRoll.permissionsGranted) return <NoPermissionsMessage />;

  const onContinue = () => {
    dispatch(addMemes(items.map(({ id, uri }) => ({ id, uri, type: MemeType.Gallery }))));
    props.navigation.replace('GalleryHome');
  };

  return (
    <View style={styles.container}>
      {noItems ? (
        <NoItemsMessage handleRefresh={camRoll.doRefresh} />
      ) : (
        <SelectableImageGrid
          images={camRoll.images}
          onSelectedChange={handleSelected}
          refreshing={camRoll.isRefreshing}
          loadingMore={camRoll.isLoadingMore}
          onRefresh={camRoll.doRefresh}
          onEndReached={camRoll.loadMore}
        />
      )}
      <FAB label="Add ..." icon="check-bold" style={styles.fab} visible={items.length > 0} onPress={onContinue} />
    </View>
  );
}

function NoItemsMessage(props: { handleRefresh: () => void }) {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>There are no photos in your camera roll!</Text>
      <Ionicons name="ios-refresh" onPress={props.handleRefresh} style={styles.refreshIcon} size={20} />
      <Text style={styles.secondaryText}>Click to refresh</Text>
    </View>
  );
}

function NoPermissionsMessage() {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>You need permissions to access Camera Roll!</Text>
      <Button onPress={() => Linking.openSettings()}>Open Settings</Button>
    </View>
  );
}

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
  fab: {
    position: 'absolute',
    bottom: 16,
    left: '30%',
    right: '30%',
  },
});
