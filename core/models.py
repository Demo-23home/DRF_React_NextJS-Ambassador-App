from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True )
    password = models.CharField(max_length=8)
    is_ambassador = models.BooleanField(default=True)
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []