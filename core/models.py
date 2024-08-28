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
    email = models.EmailField(max_length=50, unique=True)
    is_ambassador = models.BooleanField(default=True)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def revenue(self):
        user_orders = Order.objects.filter(user_id=self.id, complete=True)
        total_revenue = sum(order.ambassador_revenue for order in user_orders)
        return total_revenue


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


class Order(models.Model):
    transaction_id = models.CharField(max_length=50, null=True, blank=True)
    user = models.ForeignKey("User", on_delete=models.SET_NULL, null=True)
    code = models.CharField(max_length=50)
    ambassador_email = models.EmailField(max_length=254)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    zip = models.CharField(max_length=50, null=True, blank=True)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def ambassador_revenue(self):
        order_items = OrderItem.objects.filter(order_id=self.id)
        total_revenue = sum(
            (order_item.ambassador_revenue) for order_item in order_items
        )
        return total_revenue


class OrderItem(models.Model):
    order = models.ForeignKey("Order", on_delete=models.CASCADE)
    product_title = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField()
    admin_revenue = models.DecimalField(max_digits=7, decimal_places=2)
    ambassador_revenue = models.DecimalField(max_digits=7, decimal_places=2)
