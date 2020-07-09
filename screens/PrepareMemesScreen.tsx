import React, { useState } from "react";
import {View, Text, StyleSheet, Button as NativeButton} from "react-native";
import {Container, Content, H1, Button } from "native-base";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MemesParamList } from "../navigation/types";
import { MemeForm } from "../components/MemeForm";
import { MemeEntity } from "../model/entity";
import { Asset } from "expo-media-library";
import { useDispatch } from "react-redux";
import { MemeActions } from "../actions/memeActions";

type PrepareStackNavProp = StackNavigationProp<MemesParamList, 'Prepare'>;
type PrepareScreenRouteProp = RouteProp<MemesParamList, 'Prepare'>;
type Props = {
    navigation: PrepareStackNavProp;
    route: PrepareScreenRouteProp;
}

const createMemeEntity = (asset: Asset, name: string = '', content: string = ''): MemeEntity => ({
    assetId: asset.id,
    uri: asset.uri,
    createdAt: asset.creationTime.toString(),
    name, content
});

export function PrepareMemesScreen(props: Props) {
    

    /*TODO: !important
     * Move logic outside component and cleanup code
     */

    const { assets } = props.route.params;
    const [processedMemes, setMemes] = React.useState(assets.map(asset => createMemeEntity(asset)));

    const [current, setCurrent] = useState(0);
    const asset = assets[current];

    const currentMeme = processedMemes[current];

    const canDoNext = current < assets.length - 1;
    const canDoPrev = current > 0;
    const handleNextClick = () => canDoNext && setCurrent(current + 1);
    const handlePrevClick = () => canDoPrev && setCurrent(current - 1);

    const handleChange = (updatedMeme: MemeEntity) => {
        console.log('Updated', updatedMeme);
        processedMemes[current] = createMemeEntity(asset, updatedMeme.name, updatedMeme.content);
        console.log('All', processedMemes);
        setMemes(processedMemes);
    }

    const dispatch = useDispatch();

    const handleDonePress = () => {
        dispatch(MemeActions.add(processedMemes));
        props.navigation.replace('Gallery');
    }

    props.navigation.setOptions({
        headerRight: ({tintColor}) => (<View>
            <NativeButton
              onPress={handleDonePress}
              title="Done"
            />
          </View>)
    });

    return (
        <Container>
            <Content>
                <MemeForm meme={currentMeme} 
                          info={{current: current + 1, total: assets.length}}
                          onChange={handleChange}/>
                <View style={styles.buttonsContainer}>
                    <Button info
                            style={styles.navButton}
                            disabled={!canDoPrev}
                            onPress={handlePrevClick}>
                                <Text>Prev</Text>
                    </Button>
                    <Button info
                            style={styles.navButton}
                            disabled={!canDoNext}
                            onPress={handleNextClick}>
                                <Text>Next</Text>
                    </Button>
                </View>
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
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navButton: {
        width: '20%',
        justifyContent: 'space-evenly'
    }
});