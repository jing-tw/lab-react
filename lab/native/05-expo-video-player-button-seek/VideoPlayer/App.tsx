import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState} from 'react'
import {Dimensions, StyleSheet, Text, ScrollView, View, Button, Alert} from 'react-native';

import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'

export default function App() {
  const refScrollView = useRef(null);
  const refVideo = useRef(null);

  return (
    <ScrollView
      scrollEnabled={true}
      ref={refScrollView}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
       <Button
        title='Play and seek to 100ms'
        onPress={() => {
          // refVideo?.current?.setStatusAsync({
          //   shouldPlay: true,
          // })

          refVideo?.current?.setStatusAsync({
            shouldPlay: true,
            positionMillis: 100,
          })

          Alert.alert('Play and seek to 100ms')}
        }
      />

      <Text style={[styles.text, { fontWeight: 'bold', textTransform: 'uppercase' }]}>
        Examples 1
      </Text>
      <VideoPlayer
        style={{ height: 400 }}
        slider={{
          visible: true,
        }}
        timeVisible={true}
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,

          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          ref: refVideo,
        }}
      />


      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    marginTop: 36,
    marginBottom: 12,
  },
})