from django.core.management import BaseCommand
from django_redis import get_redis_connection

from core.models import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        # Get Redis connection
        conn = get_redis_connection("default")
        
        # Fetch all ambassadors
        ambassadors = User.objects.filter(is_ambassador=True)
        
        # Loop through each ambassador and add them to the sorted set
        for ambassador in ambassadors:
            conn.zadd("rankings", {ambassador.name: float(ambassador.revenue)})

        self.stdout.write(self.style.SUCCESS("Rankings updated successfully."))
