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



type DetailsStackNavProp = StackNavigationProp<MemesParamList, 'Gallery'>;
type DetailsScreenRouteProp = RouteProp<MemesParamList, 'Gallery'>;
type Props = {
    navigation: DetailsStackNavProp;
    route: DetailsScreenRouteProp;
}

export default function MemeGalleryScreen(props: Props) {

  const [state, reload] = useMemeList(true);

  const noItems = state.memes.length === 0 && !state.loading;
  const itemPressed = (meme: MemeEntity) => props.navigation.navigate('Details', {meme});

  return (
    <View style={styles.container}>
      {noItems ? <NoItemsMessage handleRefresh={() => {}} /> :
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
  }
});
