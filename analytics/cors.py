def corsHandler(methods):
    # header and caches preflight response for an 3600s
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ", ".join(methods),
        'Access-Control-Allow-Headers': 'Content-Type, authorization',
        'Access-Control-Max-Age': '3600'
    }

    print(headers)

    return ('', 204, headers)

