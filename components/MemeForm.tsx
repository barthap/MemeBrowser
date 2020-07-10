import React, { useState, useEffect } from 'react';
import { MemeEntity } from '../model/entity';
import { StyleSheet, YellowBox } from 'react-native';
import { Card, CardItem, Text, Left, Body, Item, Input, Textarea, Right, Button, Label, Picker } from 'native-base';
import { AssetImage } from './AssetImage';
import { fetchPhotoContent } from '../model/ocrApi';

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
    
    const [isLoading, setLoading] = useState(false);
    const [lang, setLang] = useState('eng');

    useEffect(() => {
        setLoading(false);
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
    const handleAutoDetect = async () => {
        setLoading(true);
        try {
            const newContent = await fetchPhotoContent(props.meme.assetId, lang);
            setContent(newContent);
        } catch(e) {
            console.log('Autodetection error', e);
            alert('Sorry, an error occurred :(');
        }

        setLoading(false);
    }
    const handleLangChange = (value: string) => setLang(value);

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
            <CardItem style={{flexDirection: 'row'}}>
                    <Button info onPress={handleAutoDetect}>
                        <Text>Auto detect</Text>
                    </Button>
                    {isLoading && <Text>Loading...</Text>}
            </CardItem>
            <CardItem style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Autodetection language:</Text>
                <Picker mode="dropdown"
                        style={{ width: 120 }}
                        selectedValue={lang}
                        onValueChange={handleLangChange}>
                    <Picker.Item label="English" value="eng" />
                    <Picker.Item label="Polish" value="pol" />
                </Picker>
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