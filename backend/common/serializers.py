from rest_framework import serializers
from core.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        # exclude = ('password',)
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'is_ambassador']

    def create(self, validated_data):
        groups_data = validated_data.pop("groups", None)
        user_permissions_data = validated_data.pop("user_permissions", None)

        password = validated_data.pop("password", None)

        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()

        if groups_data:
            instance.groups.set(groups_data)
        if user_permissions_data:
            instance.user_permissions.set(user_permissions_data)

        return instance
