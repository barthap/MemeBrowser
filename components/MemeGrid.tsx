
import React from 'react';
import { MemeEntity } from '../model/entity';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View, Image } from 'react-native';

export interface MemeGridProps {
    memes: MemeEntity[];
    refreshing?: boolean;
    onMemePress?: (meme: MemeEntity) => void;
    onRefresh?: () => void;
    onEndReached?: () => void;
}

export function MemeGrid(props: MemeGridProps) {

    const renderItem = ({item}) => (
        <View style={styles.itemView}>
            <TouchableOpacity
                key={item.id}
                style={{ flex: 1 }}
                onPress={() => { props.onMemePress && props.onMemePress(item) }}>
                <Image
                    style={styles.image}
                    source={require(('../assets/images/doge.jpg'))}
                />
            </TouchableOpacity>
        </View>
    );
    
    return (
        <FlatList
            data={props.memes}
            onEndReached={props.onEndReached}
            onEndReachedThreshold={0.15}
            windowSize={11}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: '100%',
    },
    itemView: {
        flex: 1,
        flexDirection: 'column',
        margin: 1 
    }
});