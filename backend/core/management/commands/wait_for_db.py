from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError
import time

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write('Waiting for the database...')
        db_conn = None
        while not db_conn:
            try:
                db_conn = connections['default']
                db_conn.cursor()  # This actually tests the connection
                self.stdout.write(self.style.SUCCESS('Database available!'))
            except OperationalError:
                self.stdout.write('Database unavailable, waiting for 1 second...')
                time.sleep(1)
