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

        if not products:
            time.sleep(4)
            products = list(Product.objects.all())
            cache.set("products_backend", products, timeout=60 * 30)  # 30 min
        search_query = request.query_params.get("search", "")
        if search_query:
            products = list(
                [
                    product
                    for product in products
                    if (search_query.lower() in product.title.lower())
                    or (search_query.lower() in product.description.lower())
                ]
            )
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
