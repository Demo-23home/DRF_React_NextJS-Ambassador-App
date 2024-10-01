from rest_framework import serializers
from core.models import Link, Order, OrderItem, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class LinkSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField()

    def get_orders(self, obj):
        list_orders = Order.objects.filter(code=obj.code)
        serializer = OrderSerializer(list_orders, many=True)
        orders = serializer.data
        return orders

    class Meta:
        model = Link
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    total = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = "__all__"

    def get_total(self, obj):
        items = OrderItem.objects.filter(order_id=obj.id)
        return sum((item.price * item.quantity) for item in items)
    
    def get_name(self, obj): 
        return f"{obj.first_name} {obj.last_name}"
