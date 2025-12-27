# apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('customer', 'Customer'),
    )

    role = models.CharField(max_length=10, choices=ROLES, default='customer')
    phone = models.CharField(max_length=15, blank=True)

    class Meta:
        db_table = 'users_user'

    def __str__(self):
        return self.username