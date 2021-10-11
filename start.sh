(trap 'kill 0' SIGINT; 
    firebase emulators:start --only auth,functions &
    functions-framework --source analytics/main.py --target hello_world --debug &
    npm start --prefix frontend)