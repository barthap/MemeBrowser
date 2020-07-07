import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {Container, Content, H1, Icon } from "native-base";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MemesParamList } from "../types";

type DetailsStackNavProp = StackNavigationProp<MemesParamList, 'Details'>;
type DetailsScreenRouteProp = RouteProp<MemesParamList, 'Details'>;
type Props = {
    navigation: DetailsStackNavProp;
    route: DetailsScreenRouteProp;
}

export function MemeDetailsScreen(props: Props) {
    const { meme } = props.route.params;

    props.navigation.setOptions({
        headerRight: ({tintColor}) => ( <View style={styles.iconContainer}>
            <Icon name="edit"
                  type="FontAwesome"
                  style={styles.icon}
                  color={tintColor}/>
            <Icon name="delete"
                  type="MaterialIcons"
                  style={styles.icon}
                  color={tintColor}/>
            </View>
        )
    });

    return (
        <Container>
            <Content style={styles.text}>
                <Image source={require('../assets/images/doge.jpg')}/>
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