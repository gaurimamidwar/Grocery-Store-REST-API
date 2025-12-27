# apps/users/permissions.py
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'admin')

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'manager')

class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.role in ['admin', 'manager']
        )

class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'customer')