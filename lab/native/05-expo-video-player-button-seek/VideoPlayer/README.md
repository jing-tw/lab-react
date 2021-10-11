# An example for using expo-video-player with button to seek video position
The example can run on iPhone using expo, however compiler shows issues.

## Issues
```bash
1. Type 'MutableRefObject<null>' is not assignable to type 'MutableRefObject<Video>'.
  Type 'null' is not assignable to type 'Video'.ts(2322)
  
2. Property 'setStatusAsync' does not exist on type 'never'.ts(2339)
```

## Quick
```bash
expo init VideoPlayer   # create a new project
cd VideoPlayer
expo install expo-av @react-native-community/slider    # install dependences
expo install expo-video-player    # install dependences

expo start
```

## Clean
```bash
rm -fr node_modules
```




## References
1. https://www.npmjs.com/package/expo-video-player
2. https://docs.expo.dev/versions/latest/sdk/video/#props




