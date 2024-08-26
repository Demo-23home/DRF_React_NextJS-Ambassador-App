from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("A User Must Have An Email!")

        if not password:
            raise ValueError("A User Must Have A Password")

        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.is_admin = False
        user.is_is_ambassador = False
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError("A User Must Have An Email!")

        if not password:
            raise ValueError("A User Must Have A Password")

        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.is_admin = True
        user.is_ambassador = False
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(
        max_length=50, unique=True
    )  # Use EmailField for validation
    is_ambassador = models.BooleanField(default=True)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()


class Product(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=50)
    image = models.CharField(max_length=50, null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)


class Link(models.Model):
    code = models.CharField(max_length=255)
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    products = models.ManyToManyField("Product")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
