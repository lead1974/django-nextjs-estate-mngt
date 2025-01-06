from django.contrib.auth import get_user_model
from social_core.pipeline.user import create_user as social_create_user
from social_core.exceptions import AuthException
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

def create_user(strategy, details, backend, user=None, *args, **kwargs):
    if user:
        logger.info(f"User already exists: {user.email}")
        return {'is_new': False, 'user': user}
        
    if not details.get('email'):
        logger.error("No email provided by OAuth provider")
        raise AuthException(backend, "Email is required for registration")
        
    try:
        logger.info(f"Creating new user with email: {details.get('email')}")
        # Check if user exists with this email
        email = details.get('email')
        existing_user = User.objects.filter(email=email).first()
        
        if existing_user:
            logger.info(f"Found existing user with email: {email}")
            return {'is_new': False, 'user': existing_user}
            
        # Create new user
        result = social_create_user(strategy, details, backend, user, *args, **kwargs)
        if result and result.get('user'):
            logger.info(f"Successfully created user: {result['user'].email}")
            return result
        else:
            logger.error("User creation failed in social_create_user")
            raise AuthException(backend, "Failed to create user")
            
    except Exception as e:
        logger.exception("Error creating user in pipeline")
        raise AuthException(backend, str(e)) 