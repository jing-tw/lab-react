#!/bin/bash
pushd ./server && tsc && popd && node ./server/index.js