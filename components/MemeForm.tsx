import React, { useState, useEffect } from 'react';
import { MemeEntity } from '../model/entity';
import { StyleSheet, YellowBox } from 'react-native';
import { Card, CardItem, Text, Left, Body, Item, Input, Textarea, Right, Button, Label } from 'native-base';
import { AssetImage } from './AssetImage';

export interface MemeFormProps {
    meme: MemeEntity;
    info?: {
        current: number;
        total: number;
    },
    onChange?: (updated: MemeEntity) => void;
}

export function MemeForm(props: MemeFormProps) {

    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setName(props.meme.name);
        setContent(props.meme.content);
    }, [props.meme.assetId]);

    const handleNameChange = (value: string) => setName(value);
    const handleContentChange = (value: string) => setContent(value);
    const handleEndEditing = () => {
        props.onChange && props.onChange({
            ...props.meme,
            name, content
        });
    }
    const handleAutoDetect = () => alert('Oops! This feature is not yet available  :(');

    const {info} = props;

    //NOTE: Native-base with RN 0.62 has YellowBox issue with useNativeDriver
    //see https://github.com/GeekyAnts/NativeBase/issues/3109
    //it is fixed and will be released in next native-base version
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);

    return (
        <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>Edit meme</Text>
                    {(info != null) && <Text note>{`Meme ${info.current} of ${info.total}`}</Text>}
                </Body>
              </Left>
            </CardItem>
            <CardItem> 
              <Body>
                <AssetImage id={props.meme.assetId} uri={props.meme.uri} style={styles.imageBorder}/>
              </Body>
            </CardItem>
            <CardItem>
                <Item floatingLabel>
                    <Label>Name / Title</Label>
                    <Input value={name} onChangeText={handleNameChange} onEndEditing={handleEndEditing}/>
                </Item>
            </CardItem>
            <CardItem>
                <Item>
                    <Textarea style={{width:'100%'}}
                              bordered={false}
                              underline={false}
                              rowSpan={3}
                              placeholder="Text content"
                              value={content}
                              onChangeText={handleContentChange}
                              onEndEditing={handleEndEditing}/>
                </Item>
            </CardItem>
            <CardItem>
                    <Button info onPress={handleAutoDetect}>
                        <Text>Auto detect</Text>
                    </Button>
            </CardItem>
          </Card>
    );
}

const styles = StyleSheet.create({
    imageBorder: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    }
});