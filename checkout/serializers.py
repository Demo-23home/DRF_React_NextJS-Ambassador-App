from rest_framework import serializers
from core.models import Link, Order, Product, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "is_ambassador"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class LinkSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Link
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "code",
            "user",
            "ambassador_email",
            "first_name",
            "last_name",
            "email",
            "address",
            "city",
            "country",
            "zip",
            "complete",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("complete", "created_at", "updated_at")

    def create(self, validated_data):
        code = validated_data.get("code")
        link = Link.objects.filter(code=code).first()

        if not link:
            raise serializers.ValidationError("Invalid code provided!")

        user = self.context["request"].user

        # Creating the Order instance
        order = Order.objects.create(
            user=user,
            code=link.code,
            ambassador_email=link.user.email,
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            email=validated_data.get("email"),
            address=validated_data.get("address"),
            city=validated_data.get("city"),
            country=validated_data.get("country"),
            zip=validated_data.get("zip"),
        )

        return order
