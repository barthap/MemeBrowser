import React from "react";
import {View, Text, StyleSheet, Image, Alert} from "react-native";
import {Container, Content, H1, Icon } from "native-base";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MemesParamList } from "../navigation/types";
import { AssetImage } from "../components/AssetImage";
import { useDispatch } from "react-redux";
import { MemeActions } from "../actions/memeActions";

type DetailsStackNavProp = StackNavigationProp<MemesParamList, 'Details'>;
type DetailsScreenRouteProp = RouteProp<MemesParamList, 'Details'>;
type Props = {
    navigation: DetailsStackNavProp;
    route: DetailsScreenRouteProp;
}

export function MemeDetailsScreen(props: Props) {
    const { meme } = props.route.params;

    const dispatch = useDispatch();
    const handleDelete = () => {
        Alert.alert(
            'Confirm',
            'Do you really want to delete this meme?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancelled deletion'),
                    style: "cancel"
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(MemeActions.deleteMeme(meme.assetId));
                        props.navigation.goBack();
                    },
                    style: "destructive"
                }
        ]);
    };
    const handleEdit = () => props.navigation.navigate('Edit', { meme });

    props.navigation.setOptions({
        headerRight: ({tintColor}) => ( <View style={styles.iconContainer}>
            <Icon name="edit"
                  type="FontAwesome"
                  style={styles.icon}
                  color={tintColor}
                  onPress={handleEdit}/>
            <Icon name="delete"
                  type="MaterialIcons"
                  style={styles.icon}
                  color={tintColor}
                  onPress={handleDelete}/>
            </View>
        )
    });

    return (
        <Container>
            <Content style={styles.text}>
                <AssetImage id={meme.assetId} uri={meme.uri} />
                <H1 style={styles.text}>{meme.name}</H1>
                <Text style={styles.text}>{meme.content}</Text>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    text: {
        padding: 10
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