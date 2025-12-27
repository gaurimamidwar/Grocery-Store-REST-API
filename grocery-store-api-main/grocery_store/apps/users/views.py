# apps/users/views.py
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdmin

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]


    def get_permissions(self):
        if self.action == 'list':
            return [IsAdmin()]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return [IsAdmin()]
        elif self.action == 'me':
            return [IsAuthenticated()]
        return [AllowAny()]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer=self.get_serializer(request.user)
        return Response(serializer.data)
