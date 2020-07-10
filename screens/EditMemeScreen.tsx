import React, { useState } from "react";
import {View, Text, StyleSheet, Image, Alert, Button} from "react-native";
import {Container, Content, H1, Icon } from "native-base";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MemesParamList } from "../navigation/types";
import { AssetImage } from "../components/AssetImage";
import { useDispatch } from "react-redux";
import { MemeActions } from "../actions/memeActions";
import { MemeForm } from "../components/MemeForm";
import { MemeEntity } from "../model/entity";

type EditScreenStackNavProp = StackNavigationProp<MemesParamList, 'Details'>;
type EditScreenRouteProp = RouteProp<MemesParamList, 'Details'>;
type Props = {
    navigation: EditScreenStackNavProp;
    route: EditScreenRouteProp;
}

export function EditMemeScreen(props: Props) {
    
    props.navigation.setOptions({
        headerRight: () => ( <View>
                <Button title="Save" onPress={handleSave} />
            </View>
        )
    });

    const [meme, setMeme] = useState(props.route.params.meme);

    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch(MemeActions.updateMeme(meme));
        
        //replace navigation history with new details screen
        props.navigation.replace('Gallery');
        props.navigation.push('Details', { meme });
    }
    const handleUpdate = (updated: MemeEntity) => setMeme(updated);

    return (
        <Container>
            <Content>
                <MemeForm meme={meme} onChange={handleUpdate} />
            </Content>
        </Container>
    );
}