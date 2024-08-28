from django.shortcuts import render
from rest_framework.views import APIView
from core.models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response

class ProductFrontendAPIView(APIView):
    def get(self, _):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    
    
    
class ProductBackendAPIView(APIView):
    def get(self, _):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    