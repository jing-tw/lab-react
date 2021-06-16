#!/bin/bash
yarn --cwd ./server install
yarn --cwd ./app install
yarn --cwd ./app build
yarn --cwd ./apitest/react install