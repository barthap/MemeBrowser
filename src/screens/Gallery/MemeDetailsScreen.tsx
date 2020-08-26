import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import ScrollView from '../../components/ThemedScrollView';
import * as Sharing from 'expo-sharing';
import { useDispatch } from 'react-redux';
import { DetailsScreenNavProps } from '../../navigation/navigation.types';
import { Appbar, Card, Paragraph, Button } from 'react-native-paper';
import { deleteMeme } from '../../core/redux/MemeSlice';

export default function MemeDetailsScreen(props: DetailsScreenNavProps) {
  const { meme } = props.route.params;

  const dispatch = useDispatch();
  const handleDelete = () => {
    Alert.alert('Confirm', 'Do you really want to delete this meme?', [
      {
        text: 'No',
        onPress: () => console.log('Cancelled deletion'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(deleteMeme(meme.id));
          props.navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  };
  //const handleEdit = () => props.navigation.navigate('Edit', { meme });

  props.navigation.setOptions({
    headerRight: () => (
      <>
        <Appbar.Action icon="pencil" />
        <Appbar.Action icon="delete" onPress={handleDelete} />
      </>
    ),
  });

  const handleShare = async () => {
    if (await Sharing.isAvailableAsync()) {
      try {
        await Sharing.shareAsync(meme.uri);
      } catch (e) {
        console.log(e.code);
      }
    } else {
      alert('Sharing is not available :(');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card} elevation={3}>
        <Card.Cover source={{ uri: meme.uri }} />
        <Card.Title title={meme.title} />
        <Card.Content>
          <Paragraph>{meme.content}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleShare}>Share</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
    //borderWidth: 1,
    //borderColor: '#aaa',
  },
});
