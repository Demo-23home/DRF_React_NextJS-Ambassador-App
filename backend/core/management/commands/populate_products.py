from typing import Any
from django.core.management import BaseCommand
from faker import Faker
from core.models import Product
import random

class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()

        for i in range(50):
            product = Product.objects.create(
                title=faker.name(),
                description=faker.text(50),
                image=faker.image_url(),
                price=random.randint(10, 100),
            )

            print(f" Product {i+1} Successfully Created :) ")
