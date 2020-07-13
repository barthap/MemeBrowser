import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {
    StyleSheet,
    View,
    Image,
    RefreshControl,
    ListRenderItemInfo
} from 'react-native';
import { MemeEntity } from '../model/entity';

export interface MemeGridProps {
    memes: MemeEntity[];
    refreshing?: boolean;
    onMemePress?: (meme: MemeEntity) => void;
    onRefresh?: () => void;
    onEndReached?: () => void;
}

export function MemeGrid(props: MemeGridProps) {
    // const doge = require('../assets/images/doge.jpg');
    const renderItem = ({ item }: ListRenderItemInfo<MemeEntity>) => (
        <View style={styles.itemView}>
            <TouchableOpacity
                key={item.assetId}
                style={{ flex: 1 }}
                onPress={() => {
                    props.onMemePress && props.onMemePress(item);
                }}
            >
                <Image style={styles.image} source={{ uri: item.uri }} />
            </TouchableOpacity>
        </View>
    );

    const refreshControl = (
        <RefreshControl
            refreshing={props.refreshing || false}
            onRefresh={props.onRefresh}
        />
    );

    return (
        <FlatList
            data={props.memes}
            refreshControl={refreshControl}
            onEndReached={props.onEndReached}
            onEndReachedThreshold={0.15}
            windowSize={11}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item) => item.assetId}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: '100%'
    },
    itemView: {
        flex: 1,
        flexDirection: 'column',
        margin: 1
    }
});
