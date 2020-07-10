
import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View, Image, RefreshControl, ListRenderItemInfo } from 'react-native';
import { Asset } from 'expo-media-library';
import { Badge, Icon } from 'native-base';

export interface SelectableItem<T> {
    selected: boolean,
    data: T
};
export type SelectableAsset = SelectableItem<Asset>;

export interface ImageGridProps {
    images: SelectableAsset[];
    refreshing?: boolean;
    onSelectedChange?: (items: Asset[]) => void;
    onRefresh?: () => void;
    onEndReached?: () => void;
}

export function SelectableImageGrid(props: ImageGridProps) {

    const [selectedItems, setSelectedItems] = useState<SelectableAsset[]>([]);

    const handlePress = (item: SelectableAsset) => {
        item.selected = !item.selected;
        
        const sel = props.images.filter(item => item.selected)
        props.onSelectedChange && props.onSelectedChange(sel.map(item => item.data));
        setSelectedItems(sel);
    }

    const renderItem = ({item}: ListRenderItemInfo<SelectableAsset>) => (
        <View style={styles.itemView}>
            <TouchableOpacity
                key={item.data.id}
                style={{ flex: 1 }}
                onPress={() => { handlePress(item) }}>
                   
                <Image
                    style={item.selected ? [styles.image, styles.selectionBorder] : styles.image}
                    source={{uri: item.data.uri}}
                />
                {item.selected && <View style={styles.overlay} />}
                {item.selected && <Badge primary style={styles.badge}>
                        <Icon name="check" type="FontAwesome" style={styles.badgeIcon}/>
                    </Badge>
                }
            </TouchableOpacity>
        </View>
    );

    const refreshControl = <RefreshControl
        refreshing={props.refreshing || false}
        onRefresh={props.onRefresh}
    />;
    
    return (
        <FlatList
            data={props.images}
            extraData={selectedItems}
            refreshControl={refreshControl}
            onEndReached={props.onEndReached}
            onEndReachedThreshold={0.15}
            windowSize={11}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={item => item.data.id}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.7)',
        margin:2
    },
    selectionBorder: {
        borderColor: '#05f',
        borderRadius: 3,
        borderWidth: 2,
        flex: 1,
    },
    itemView: {
        flex: 1,
        flexDirection: 'column',
        margin: 1 
    },
    badge: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    badgeIcon: {
        fontSize: 15,
        color: "#fff",
        lineHeight: 20
    }
});