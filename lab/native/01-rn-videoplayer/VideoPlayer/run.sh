#!/bin/bash
yarn install
cd ios
npx pod-install
cd ..
npx react-native run-ios
