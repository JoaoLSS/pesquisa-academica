import firebase_admin
from firebase_admin import auth

firebase_admin.initialize_app()

def authenticateUser(request):
    token = request.headers.get('authorization').split(" ")[1]
    return auth.verify_id_token(token)