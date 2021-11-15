import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, ScrollView, View, Button, Alert } from 'react-native';

import { Video } from 'expo-av'

import firebase from 'firebase'
// import {initializeApp} from 'firebase/app';
// import { getDatabase, ref, set, onValue } from 'firebase/database';

// Initialize Firebase
// Check the Project Filebase or here, https://docs.google.com/presentation/d/1xFKF3AHkZ_5ugXC1FHWlwY77T6fwvE61WDRTumbiDtQ/edit?usp=sharing
const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "xxx",
  databaseURL: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx"
};


// https://stackoverflow.com/questions/43331011/firebase-app-named-default-already-exists-app-duplicate-app
if (!firebase.apps.length) {
  Alert.alert('new initial firebase app');
  firebase.initializeApp(firebaseConfig);
} else {
  Alert.alert('if already initialized, use that one');
  firebase.app(); // if already initialized, use that one
}

// firebase.initializeApp(firebaseConfig);

function storeHighScore(userId: any, score: any) {
  // Ref: 
  // 1. https://firebase.google.com/docs/reference/node/firebase.database.Database
  // 2. https://firebase.google.com/docs/reference/js/v8/firebase.database.Database#ref

  const db = firebase.database();
  var rootRef = firebase.database().ref();
  var userRef = rootRef.child('users/' + userId);
  // var userIdRef = firebase.database().ref('users/' + userId);

  userRef.set({ highscore: score }, () => { Alert.alert('write ok.') })
  // const reference = ref(db, 'users/' + userId);
  // set(ref(db, 'users/' + userId), {
  //   highscore: score,
  // });
}

function getHighScore(userId:any) {
  // ref. https://firebase.google.com/docs/database/web/read-and-write#web-version-8
  const db = firebase.database();
  var rootRef = firebase.database().ref();
  var userRef = rootRef.child('users/' + userId);

  userRef.on('value', (snapshot) => {
    const data = snapshot.val();
    Alert.alert('read data = ' + JSON.stringify(data));
  });
}


// Alert.alert('Play and seek to 100ms')
// storeHighScore('1234', '1234');
// Alert.alert('store high score');

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export default function App() {
  const video = React.useRef(null as any);
  const [status, setStatus] = React.useState({} as any);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: 'bold', textTransform: 'uppercase' }]}>
        Examples 1
      </Text>

      <Video
        ref={video}
        style={{ width: DEVICE_WIDTH, height: 300 }}
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        shouldPlay
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      {/* Control button view */}
      <View style={styles.viewControlButton}
      >

        <Button
          title={'write'}
          onPress={() => {
            storeHighScore('testUserId', '1234');
          }
          }
        />

<Button
          title={'read'}
          onPress={() => {
            getHighScore('testUserId');
          }
          }
        />


        {/* Play button */}
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />

        {/* Seek button */}
        <Button
          title={'Seek'}
          onPress={() => {
            if (status.isPlaying) {
              video.current.setPositionAsync(2000);
            } else {
              Alert.alert('Click [Play]');
            }


          }
          }
        />
      </View>

      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewControlButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 36,
    marginBottom: 12,
  },
});