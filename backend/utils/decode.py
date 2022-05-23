import jwt


def get_jwt_data(request):
    """Decode jwt token"""
    if 'Authorization' not in request.headers.keys():
        return None

    jwt_token = request.headers['Authorization'].split()[1]
    payload = jwt.decode(jwt_token, 'django-insecure-#9j3dw!%gawgx(#5^ar$+m67q23x+ql3=vw*79e2n+8w_#tsh#', algorithms=['HS256'])
    return payload
