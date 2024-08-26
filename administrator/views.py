from django.shortcuts import render
from rest_framework.views import APIView
from core.models import User
from common.serializers import UserSerializer
from rest_framework.response import Response
# Create your views here.




class AmbassadorsAPIView(APIView):
    def get(self, _):
        ambassadors = User.objects.filter(is_ambassador=True)
        serializer = UserSerializer(ambassadors, many=True)
        return Response(serializer.data)