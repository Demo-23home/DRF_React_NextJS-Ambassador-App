from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from .Authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions


class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data.copy()
        if data["password"] != data["confirm_password"]:
            return Response("Passwords don't match")
        data["is_ambassador"] = "api/ambassador" in request.path
        serializer = UserSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class LoginAPIView(APIView):
    def post(self, request):
        data = request.data
        if not data["password"]:
            return Response("Password is Required")

        scope = "ambassador" if "api/ambassador" in request.path else "admin"
        email = data["email"]
        password = data["password"]

        user = get_object_or_404(User, email=email)

        if user is not None:
            if user.is_ambassador and scope == "admin":
                raise exceptions.AuthenticationFailed("Invalid Scope")
            if user.check_password(password):
                token = JWTAuthentication.generate_jwt(user, scope)
                response = Response()
                response.set_cookie(
                    key="jwt",
                    value=token,
                    httponly=True,
                    samesite="None",  # Allows cross-site requests
                    secure=True,  # Secure cookies only in production (HTTPS)
                )

                response.data = {"Message": "Success"}
                return response
            return Response("Incorrect Password!")
        return Response("User is not found!")


class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = UserSerializer(user).data

        if 'api/ambassador' in request.path:
            data['revenue'] = user.revenue

        return Response(data)


class LogOutAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response()
        response.delete_cookie(key="jwt")

        response.data = {"message": "success"}

        return response


class UpdateUserProfileAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class UpdateUserPasswordAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        data = request.data
        user = request.user

        if data["password"] != data["confirm_password"]:
            raise exceptions.APIException("Passwords Don't Match!")

        user.set_password(data["password"])
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)
