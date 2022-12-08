import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import {useData} from '../context/dataContext';

function CreateScreen(){
    const [recording, setRecording] = React.useState();
    const [data, setData] = useData();

    async function startRecording() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(recording);
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }
    
      async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        let newRecording = [...data]
        console.log(recording)
        const {sound} = await recording.createNewLoadedSoundAsync();
        const uri = recording.getURI();

        newRecording.push({id: Date.now(), sound: sound, file: uri})
        setData(newRecording)
        console.log('Recording stopped and stored at', uri);
      }
    

    return(
        <View style={styles.container}>
            <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={ recording ? stopRecording : startRecording} />
        </View>
    )
}

export default CreateScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})