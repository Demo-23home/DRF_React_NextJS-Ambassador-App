import jwt, datetime
from django.conf import settings

class JWTAutentication:
    @staticmethod
    def generate_jwt(id):
        payload = {
            'admin_id':id, 
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1), 
            'iat': datetime.datetime.utcnow()
        }
        
        return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')