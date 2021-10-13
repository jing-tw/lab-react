# An example of using expo-video with play, pause, seek functions
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

## Issues
``` bash
1. Property 'isPlaying' does not exist on type '{}'
=> Change 
From:
const [status, setStatus] = React.useState({});

To:
const [status, setStatus] = React.useState({} as any);
```

## Google Doc
1. https://docs.google.com/document/d/1fu5StnuG_8ZMV7iB2db-hBwBSHZY6YBjoFP0_cGLudo/edit?usp=sharing

## Reference
1. https://docs.expo.dev/versions/latest/sdk/video/#props




