from rest_framework.views import APIView
from core.models import Link, Order, User, Product
from common.serializers import UserSerializer
from rest_framework.response import Response
from common.Authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, mixins
from .serializers import LinkSerializer, OrderSerializer, ProductSerializer
from django.core.cache import cache


def clear_cache(*args):
    for arg in args:
        cache.delete(arg)


class AmbassadorsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, _):
        ambassadors = User.objects.filter(is_ambassador=True)
        serializer = UserSerializer(ambassadors, many=True)
        return Response(serializer.data)


class ProductGenericAPIView(
    generics.GenericAPIView,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)
        return self.list(request)

    def post(self, request):
        response = self.create(request)
        clear_cache("products_backend", "products_frontend")
        return response

    def put(self, request, pk=None):
        response = self.partial_update(request, pk)
        clear_cache("products_backend", "products_frontend")
        return response

    def delete(self, request, pk=None):
        response = self.destroy(request, pk)
        clear_cache("products_backend", "products_frontend")
        return response


class LinkAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        links = Link.objects.filter(user_id=user_id)
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)


class OrderAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(complete=True)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
