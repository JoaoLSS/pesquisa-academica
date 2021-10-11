from database import engine, toJson
from authUser import authenticateUser
from cors import corsHandler

headers = {
    'Access-Control-Allow-Origin': '*'
}

def hello_world(request):
    if request.method == 'OPTIONS':
        return corsHandler(['GET'])
    user = authenticateUser(request)
    print(user)
    connection = engine.connect()
    result = connection.execute('SELECT * FROM public."Survey" LIMIT 1000;')
    return (toJson(result),200,headers)
     