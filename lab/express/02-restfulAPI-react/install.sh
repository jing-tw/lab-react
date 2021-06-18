#!/bin/bash
yarn --cwd ./server install
yarn --cwd ./server-view install
yarn --cwd ./server-view build
yarn --cwd ./apitest/react install