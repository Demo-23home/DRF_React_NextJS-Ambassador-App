import jwt, datetime
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from core.models import User
from django.shortcuts import get_object_or_404


class JWTAuthentication(BaseAuthentication):

    def authenticate(self, request):
        token = request.COOKIES.get("jwt")

        if token is not None:

            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms="HS256")
            except jwt.ExpiredSignatureError:
                raise exceptions.AuthenticationFailed("unauthenticated")

            user_id = payload["user_id"]
            user = get_object_or_404(User, id=user_id)

            if user is not None:
                return (user, None)

    @staticmethod
    def generate_jwt(id):
        payload = {
            "user_id": id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
            "iat": datetime.datetime.utcnow(),
        }

        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
