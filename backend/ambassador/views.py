from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.views import APIView
from administrator.serializers import LinkSerializer
from common.Authentication import JWTAuthentication
from core.models import Link, Order, Product, User
from .serializers import ProductSerializer
from rest_framework.response import Response
from django.core.cache import cache
import time
import random
import string
from rest_framework.permissions import IsAuthenticated
from django_redis import get_redis_connection
import math


class ProductFrontendAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(60 * 60 * 2, key_prefix="products_frontend"))
    def get(self, _):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductBackendAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        products = cache.get("products_backend")

        # Caching Function
        if not products:
            # time.sleep(2)
            products = list(Product.objects.all())
            cache.set("products_backend", products, timeout=60 * 30)  # 30 min

        # Query Params
        search_query = request.query_params.get("search", "")
        sorting_query = request.query_params.get("sort", "")
        page = int(request.query_params.get("page", 1))
        if page == 0:
            return Response("Not A Valid Page")

        # Search Function
        if search_query:
            products = list(
                [
                    product
                    for product in products
                    if (search_query.lower() in product.title.lower())
                    or (search_query.lower() in product.description.lower())
                ]
            )

        # Sort Function
        if sorting_query:
            if sorting_query == "asc":
                products.sort(key=lambda p: p.price)
            elif sorting_query == "desc":
                products.sort(key=lambda p: p.price, reverse=True)
            else:
                return Response(
                    "Not A Valid Sorting Query, use either 'asc' or 'desc' !"
                )
        # Paginating Function
        total_products = len(products)
        products_per_page = 10
        start = (page - 1) * products_per_page
        end = page * products_per_page
        if page:
            if page == 0:
                return Response("Not A Valid Page")

            last_page = math.ceil(len(products)/products_per_page)

        # Final Response
        data = ProductSerializer(products[start:end], many=True).data

        return Response(
            {
                "data": data,
                "meta": {
                    "total": total_products,
                    "page": page,
                    "last_page": last_page,
                },
            }
        )


class LinkAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        products = request.data["products"]
        data = {
            "user": user.id,
            "products": products,
            "code": "".join(
                random.choices(string.ascii_lowercase + string.digits, k=6)
            ),
        }
        serializer = LinkSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class StatsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        links = Link.objects.filter(user=user)

        stats = [self.format(link) for link in links]
        return Response(stats)

    def format(self, link):
        link_code = link.code
        orders = Order.objects.filter(code=link_code, complete=1)

        orders_revenue = sum(order.ambassador_revenue for order in orders)

        formatted_stats = {
            "code": link_code,
            "count": len(orders),
            "revenue": orders_revenue,
        }
        return formatted_stats


class RankingsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        conn = get_redis_connection("default")

        rankings = conn.zrevrangebyscore(
            "rankings", min=0, max=1000, withscores=True)

        response = {ranking[0].decode("utf-8"): ranking[1]
                    for ranking in rankings}
        return Response(response)
