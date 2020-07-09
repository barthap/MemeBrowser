import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Image, StyleProp, ImageStyle, Dimensions } from 'react-native';

export interface AssetImageProps {
    id: string;
    uri: string;
    style?: StyleProp<ImageStyle>;
}

const winHeight = Dimensions.get('window').height; 

export function AssetImage(props: AssetImageProps) {
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        MediaLibrary.getAssetInfoAsync(props.id)
            .then((info) => setAspectRatio(info.width/info.height))
    }, [props.id]);

    const sizedStyle: StyleProp<ImageStyle> = {
        alignSelf: 'stretch',
        maxWidth: '100%',
        maxHeight: winHeight * .6,
        aspectRatio: aspectRatio,
    }

    return <Image source={{uri: props.uri}} resizeMode="contain"
        style={[sizedStyle, props.style]}/>;

}