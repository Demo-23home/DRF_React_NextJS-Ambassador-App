from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404



class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data.copy()
        if data['password'] != data['confirm_password']:
            return Response("Passwords don't match")
        data['is_ambassador'] = 0  
        serializer = UserSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)



class LoginAPIView(APIView):
    def post(self, request):
        data = request.data
        
        email = data['email']
        password = data['password']
        
        user = get_object_or_404(User, email=email)
        
        if user is not None:
            if user.check_password(password):
                serializer = UserSerializer(user)
                return Response(serializer.data)
            return Response("Incorrect Password!")
        return Response("User is not found!")