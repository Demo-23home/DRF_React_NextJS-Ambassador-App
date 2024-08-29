import math
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.views import APIView
from core.models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from django.core.cache import cache
import time


class ProductFrontendAPIView(APIView):
    @method_decorator(cache_page(60 * 60 * 2, key_prefix="products_frontend"))
    def get(self, _):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductBackendAPIView(APIView):
    def get(self, request):
        products = cache.get("products_backend")

        # Caching Function
        if not products:
            # time.sleep(4)
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
            elif page == 1:
                last_page = None
            else:
                last_page = page - 1

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
