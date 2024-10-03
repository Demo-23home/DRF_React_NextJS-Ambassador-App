from django.core.management import BaseCommand
from core.models import Order, OrderItem, User
import random
from faker import Faker

class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        orders_number = 20
        user_id = 3
        user = User.objects.get(id=user_id)
        for i in range(orders_number):
            order = Order.objects.create(
                user_id=user_id,
                code="code",
                ambassador_email=user.email,
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                email=faker.email(),
                complete=True,
            )
            print(f"Order {i+1} has been Created")
            print("*"*50)

            price = random.randrange(10, 100)
            quantity = random.randrange(1, 5)
            for j in range(random.randint(1, 5)):
                order_item = OrderItem.objects.create(
                    order_id=order.id,
                    product_title=faker.name(),
                    price=price,
                    quantity=quantity,
                    admin_revenue=0.9 * price * quantity,
                    ambassador_revenue=0.1 * price * quantity,
                )
                print(f"OrderItem{j+1} has been Created")
            print("*"*50)
            
        print("Automation Code Has finished Executing :)")