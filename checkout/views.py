import decimal
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import LinkSerializer, OrderSerializer
from common.Authentication import JWTAuthentication
from core.models import Link, Order, OrderItem, Product
from rest_framework.response import Response
from rest_framework import exceptions, status

# Create your views here.


class LinkAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, _, code):
        link = Link.objects.filter(code=code).first()
        serializer = LinkSerializer(link)

        return Response(serializer.data)


class OrderAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        code = data["code"]
        link = Link.objects.filter(code=code).first()
        user = request.user
        products = data["products"]

        if not link:
            raise exceptions.APIException("Invalid Code!")

        order = Order()
        order.code = link.code
        order.user = user
        order.ambassador_email = link.user.email
        order.first_name = data["first_name"]
        order.last_name = data["last_name"]
        order.email = data["email"]
        order.address = data["address"]
        order.zip = data["zip"]
        order.country = data["country"]
        order.save()

        for item in products:
            product = Product.objects.get(id =item["product_id"])
            quantity = decimal.Decimal(item["quantity"])

            order_item = OrderItem()
            order_item.order = order
            order_item.price = product.price
            order_item.quantity = quantity
            order_item.product_title = product.title
            order_item.ambassador_revenue = decimal.Decimal(0.1) * product.price
            order_item.admin_revenue = product.price * decimal.Decimal(0.9)
            order_item.save()

            return Response({"message": "success"})
