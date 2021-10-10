from database import engine, toJson

def hello_world(request):
    connection = engine.connect()
    result = connection.execute('SELECT * FROM public."Survey" LIMIT 1000;')
    return toJson(result)
     