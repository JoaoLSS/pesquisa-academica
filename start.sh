
(trap 'kill 0' SIGINT; functions-framework --source analytics/main.py --target hello_world --debug & firebase serve --only functions --port=5005 & npm start --prefix frontend)