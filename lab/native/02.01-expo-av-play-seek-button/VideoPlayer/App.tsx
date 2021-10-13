import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, ScrollView, View, Button, Alert } from 'react-native';

import { Video } from 'expo-av'

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


