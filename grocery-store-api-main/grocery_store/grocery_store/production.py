# grocery_store/production.py
from .settings import *
import os

DEBUG = False

ALLOWED_HOSTS = ['.azurewebsites.net', 'your-app-name.azurewebsites.net']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',  # default database name
        'USER': 'groceryadmin',  # the admin-user you created
        'PASSWORD': 'Grocery@123!',  # the admin-password you created
        'HOST': 'grocery-store-db.postgres.database.azure.com',  # your server name
        'PORT': '5432',
    }
}

# Static files
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATIC_URL = '/static/'

# Whitenoise middleware for static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True