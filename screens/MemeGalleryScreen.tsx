import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { MemeEntity } from '../model/entity';
import { MemeGrid } from '../components/MemeGrid';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MemesParamList } from '../types';



const data: MemeEntity[] = [
  {id: 1, path: "", name: "Img 1", content: "meme 1", createdAt: ""},
  {id: 2, path: "", name: "Img 2", content: "meme 2", createdAt: ""},
  {id: 3, path: "", name: "Img 3", content: "meme 3", createdAt: ""},
  {id: 4, path: "", name: "Img 4", content: "meme 4", createdAt: ""},
  {id: 5, path: "", name: "Img 5", content: "meme 5", createdAt: ""},
  {id: 6, path: "", name: "Img 6", content: "meme 6", createdAt: ""},
  {id: 7, path: "", name: "Img 7", content: "meme 7", createdAt: ""},
]


type DetailsStackNavProp = StackNavigationProp<MemesParamList, 'Gallery'>;
type DetailsScreenRouteProp = RouteProp<MemesParamList, 'Gallery'>;
type Props = {
    navigation: DetailsStackNavProp;
    route: DetailsScreenRouteProp;
}

export default function MemeGalleryScreen(props: Props) {

  const noItems = data.length === 0;
  const itemPressed = (meme: MemeEntity) => props.navigation.navigate('Details', {meme});

  return (
    <View style={styles.container}>
      {noItems ? <NoItemsMessage handleRefresh={() => {}} /> :
        <MemeGrid memes={data} onMemePress={itemPressed}/>
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
