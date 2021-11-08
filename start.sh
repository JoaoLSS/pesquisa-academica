#!/usr/bin/env bash

set -e

function fb-emulator() {
    cd functions;
    npx tsc;
    cd ..;
    firebase emulators:start --only functions;
}

function analytics() {
    functions-framework --source analytics/main.py --target hello_world --debug;
}

function frontend() {
    npm start --prefix frontend
}

function frontend-watch() {
    npm run start-watch --prefix frontend
}

function all() {
(trap 'kill 0' SIGINT; 
    firebase emulators:start --only auth,functions &
    functions-framework --source analytics/main.py --target hello_world --debug &
    npm start --prefix frontend)
}

"$@"