import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { MemeEntity } from '../model/entity';
import { MemeGrid } from '../components/MemeGrid';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MemesParamList } from '../navigation/types';
import { useMemeList } from '../hooks/useMemeList';
import { SearchBar } from '../components/SearchBar';
import { Icon } from 'native-base';



type GalleryStackNavProp = StackNavigationProp<MemesParamList, 'Gallery'>;
type GalleryScreenRouteProp = RouteProp<MemesParamList, 'Gallery'>;
type Props = {
    navigation: GalleryStackNavProp;
    route: GalleryScreenRouteProp;
}

export default function MemeGalleryScreen(props: Props) {
  props.navigation.setOptions({
    headerRight: ({tintColor}) => ( <View >
        <Icon name="add"
              type="Ionicons"
              style={styles.icon}
              color={tintColor}
              onPress={() => props.navigation.navigate('Picker')}/>
        </View>
      )
  });


  const [state, reload, setFilter] = useMemeList(true);

  const noItems = state.memes.length === 0 && !state.loading;
  const itemPressed = (meme: MemeEntity) => props.navigation.navigate('Details', {meme});

  return (
    <View style={styles.container}>
      <SearchBar onTextChanged={setFilter} />
      {noItems ? <NoItemsMessage handleRefresh={reload} /> :
        <MemeGrid memes={state.memes}
                  refreshing={state.loading}
                  onRefresh={reload}
                  onMemePress={itemPressed}/>
      }
    </View>
  );
}

function NoItemsMessage(props: {handleRefresh: () => void}) {
  return <View style={styles.messageContainer}>
      <Text style={styles.messageText}>Meme list is empty!</Text>
      <Ionicons name='ios-refresh' onPress={props.handleRefresh} style={styles.refreshIcon} size={20}/>
      <Text style={styles.secondaryText}>Click to refresh</Text>
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
  },
  icon: {
    paddingRight: 15,
  },
  iconContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 100
  }
});

