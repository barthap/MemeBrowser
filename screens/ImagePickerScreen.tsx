import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MemesParamList } from '../navigation/types';
import { SelectableImageGrid, GridItem } from '../components/SelectableImageGrid';
import { useCameraRoll } from '../hooks/useCameraRoll';

type PickerStackNavProp = StackNavigationProp<MemesParamList, 'Picker'>;
type PickerScreenRouteProp = RouteProp<MemesParamList, 'Picker'>;
type Props = {
    navigation: PickerStackNavProp;
    route: PickerScreenRouteProp;
}

export default function ImagePickerScreen(props: Props) {

  const camRoll = useCameraRoll();

  const handleSelected = (items: MediaLibrary.Asset[]) => {

    props.navigation.setOptions({
      headerTitle: `${items.length} items selected`
    });
  }

  const images: GridItem[] = camRoll.images.map(data => ({data, selected: false}));
  const noItems = images.length === 0 && !camRoll.isLoading;

  if(!camRoll.permissionsGranted) return <NoPermissionsMessage/>;

  return (
    <View style={styles.container}>
      {noItems ? <NoItemsMessage handleRefresh={camRoll.doRefresh}/> :
        <SelectableImageGrid images={images}
                  onSelectedChange={handleSelected}
                  refreshing={camRoll.isLoading}
                  onRefresh={camRoll.doRefresh}/>
      }
    </View>
  );
}

function NoItemsMessage(props: {handleRefresh: () => void}) {
  return <View style={styles.messageContainer}>
      <Text style={styles.messageText}>There are no photos in your camera roll!</Text>
      <Ionicons name='ios-refresh' onPress={props.handleRefresh} style={styles.refreshIcon} size={20}/>
      <Text style={styles.secondaryText}>Click to refresh</Text>
  </View>;
}

function NoPermissionsMessage() {
  return <View style={styles.messageContainer}>
      <Text style={styles.messageText}>You need permissions to access Camera Roll!</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messageContainer: {
      flex: 1,
      justifyContent: 'center', alignItems: 'center'
  },
  messageText: {
      fontSize: 15
  },
  refreshIcon: {
      paddingTop: 20,
      fontSize: 50
  },
  secondaryText: {
      fontSize: 12,
      color: '#555'
  }
});
