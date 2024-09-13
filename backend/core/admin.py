from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


class SuperUser(UserAdmin):
    ordering = ["id"]
    list_display = ("email", "is_ambassador", "is_staff", "first_name", "last_name")


admin.site.register(User, SuperUser)
