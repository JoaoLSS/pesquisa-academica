export FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
(trap 'kill 0' SIGINT; 
    firebase emulators:start --only auth,functions &
    functions-framework --source analytics/main.py --target hello_world --debug &
    npm start --prefix frontend)