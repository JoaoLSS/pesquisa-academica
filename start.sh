#!/usr/bin/env bash

set -e

function fb_emulator() {
    firebase emulators:start --only auth,functions;
}

function analytics() {
    functions-framework --source analytics/main.py --target hello_world --debug;
}

function frontend() {
    npm start --prefix frontend
}

function all() {
(trap 'kill 0' SIGINT; 
    firebase emulators:start --only auth,functions &
    functions-framework --source analytics/main.py --target hello_world --debug &
    npm start --prefix frontend)
}

"$@"