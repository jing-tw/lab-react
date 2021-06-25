#!/bin/bash
yarn --cwd ./server install
yarn --cwd ./client install
yarn --cwd ./client build
yarn --cwd ./apitest/react install