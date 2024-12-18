from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Activate a user account by username'

    def add_arguments(self, parser):
        # Add a positional argument for the username
        parser.add_argument('username', type=str, help='The username of the user to activate')

    def handle(self, *args, **options):
        username = options['username']
        try:
            # Fetch the user
            user = User.objects.get(username=username)
            
            # Activate the user
            if user.is_active:
                self.stdout.write(self.style.WARNING(f"User '{username}' is already active."))
            else:
                user.is_active = True
                user.save()
                self.stdout.write(self.style.SUCCESS(f"User '{username}' has been activated."))
        except User.DoesNotExist:
            raise CommandError(f"User '{username}' does not exist.")
