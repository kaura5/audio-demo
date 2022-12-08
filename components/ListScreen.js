import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useData} from '../context/dataContext';
import * as Sharing from 'expo-sharing';

const Item =({note, onPress}) =>{
    return(
        <View style={styles.card} >
            <Text style={{fontSize: 18}}>{new Date(note.id).toLocaleString("en-US")}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{margin: 10}}>
                    <Button title="Play" onPress={onPress} />
                </View>
                <View style={{margin: 10}}>
                    <Button title="Share" onPress={()=> Sharing.shareAsync(note.file)} />
                </View>
            </View>
        </View>
    )
}

function ListScreen(){

    const [data, setData] = useData();
    console.log(data)

    async function handlePlay(item){
        item.sound.replayAsync()
    }

    return(
        <SafeAreaView>
            <FlatList 
            data= {data}
            renderItem = {({item})=>(
                <Item note={item} onPress={()=> handlePlay(item)} />
            )}
            keyExtractor={item => item.id} />
        </SafeAreaView>
    )

}
export default ListScreen;

const styles = StyleSheet.create({
    card:{
        padding: 20,
        margin: 10,
        backgroundColor: 'lightgrey'
    }
})