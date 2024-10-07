import decimal
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
import stripe
import stripe.checkout
from .serializers import LinkSerializer
from common.Authentication import JWTAuthentication
from core.models import Link, Order, OrderItem, Product
from rest_framework.response import Response
from rest_framework import exceptions
from django.db import transaction
from django.conf import settings
from django.core.mail import send_mail
# import time
# Create your views here.


class LinkAPIView(APIView):
    def get(self, _, code):
        link = Link.objects.filter(code=code).first()
        serializer = LinkSerializer(link)
        # time.sleep(2)
        return Response(serializer.data)


class OrderAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        try:
            data = request.data
            # code = data["code"]
            link = Link.objects.filter(code=data['code']).first()
            products = data["products"]

            if not link:
                raise exceptions.APIException("Invalid Code!")

            order = Order()
            order.code = link.code
            order.user = link.user
            order.ambassador_email = link.user.email
            order.first_name = data["first_name"]
            order.last_name = data["last_name"]
            order.email = data["email"]
            order.address = data["address"]
            order.zip = data["zip"]
            order.country = data["country"]
            with transaction.atomic():
                order.save()

            line_items = []

            for item in products:
                product = Product.objects.get(id=item["product_id"])
                quantity = decimal.Decimal(item["quantity"])

                order_item = OrderItem()
                order_item.order = order
                order_item.price = product.price
                order_item.quantity = quantity
                order_item.product_title = product.title
                order_item.ambassador_revenue = decimal.Decimal(
                    0.1) * product.price
                order_item.admin_revenue = product.price * decimal.Decimal(0.9)
                with transaction.atomic():
                    order_item.save()

                line_items.append(
                    {
                        "price_data": {
                            "currency": "usd",
                            "product_data": {
                                "name": product.title,
                                "description": product.description,
                                "images": [product.image],
                            },
                            "unit_amount": int(product.price * 100),
                        },
                        "quantity": int(quantity),
                    }
                )

            stripe.api_key = settings.STRIPE_SECRETEKEY

            source = stripe.checkout.Session.create(
                success_url="http://localhost:5000/success?source={CHECKOUT_SESSION_ID}",
                cancel_url="http://localhost:5000/error",
                line_items=line_items,
                mode="payment",
                payment_method_types=["card"],
            )
            with transaction.atomic():
                order.transaction_id = source["id"]
            order.save()
            return Response(source)
        except:  # noqa: E722
            transaction.rollback()
        return Response("Error Occurred")


class OrderConfirmAPIView(APIView):
    def post(self, request):
        order = Order.objects.filter(
            transaction_id=request.data["source"]).first()
        if not order:
            raise exceptions.APIException("Order not found!")

        order.complete = 1
        order.save()

        # Admin Email
        send_mail(
            subject="An Order has been completed",
            message="Order #"
            + str(order.id)
            + "with a total of $"
            + str(order.admin_revenue)
            + " has been completed!",
            from_email="from@email.com",
            recipient_list=["admin@admin.com"],
        )

        send_mail(
            subject="An Order has been completed",
            message="You earned $"
            + str(order.ambassador_revenue)
            + " from the link #"
            + order.code,
            from_email="from@email.com",
            recipient_list=[order.ambassador_email],
        )

        return Response({"message": "success"})
