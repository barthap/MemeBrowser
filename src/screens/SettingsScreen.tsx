import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import db from '../model/db';
import { SettingsParamList } from '../navigation/types';

type SettingsStackNavProp = StackNavigationProp<
    SettingsParamList,
    'SettingsScreen'
>;
type SettingsScreenRouteProp = RouteProp<SettingsParamList, 'SettingsScreen'>;
type Props = {
    navigation: SettingsStackNavProp;
    route: SettingsScreenRouteProp;
};
export default function SettingsScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is settings screen</Text>
            <Text>There is nothing here yet</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <View>
                <Text>And this is debug area for testing snippets.</Text>
            </View>
            <Button title="Reset schema" onPress={() => db.reset(false)} />
            <Button
                title="Debug screen"
                onPress={() => navigation.navigate('Debug')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});
