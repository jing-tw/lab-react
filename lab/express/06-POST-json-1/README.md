# An example for POST json to server
## Script Version
### Install
```bash
./install.sh
```
### Run
```bash
./startserver.sh
```
## Detail Version
### Install
```bash
yarn --cwd ./server install
yarn --cwd ./client install
yarn --cwd ./client build
# yarn --cwd ./apitest/react install
```

### Run
```bash
cd server
tsc
node index.js
```

## Test
1. Command Line
```bash
gio http://localhost:9000
```

2. React App Test
```bash
yarn --cwd ./apitest/react/my-app start
```

## Clean
```bash
./makeclean.sh
```
