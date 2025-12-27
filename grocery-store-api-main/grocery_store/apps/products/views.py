# apps/products/views.py
from rest_framework import viewsets, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from apps.users.permissions import IsAdmin, IsManager, IsAdminOrManager
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from .models import Category, Product
from .filters import ProductFilter
from .serializers import CategorySerializer, ProductSerializer, BulkProductCreateSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminOrManager()]
        return [IsAuthenticated()]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['price', 'name', 'created_at']

    def get_queryset(self):
        queryset = Product.objects.all()
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        
        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'bulk_create']:
            return [IsAdminOrManager()]
        return [IsAuthenticated()]
    
    @action(detail=False, methods=['post'])
    def bulk_create(self, request):
        """
        Create multiple products at once.
        """
        serializer = BulkProductCreateSerializer(data=request.data)
        
        try:
            if serializer.is_valid(raise_exception=True):
                products = serializer.save()
                return Response({
                    'status': 'success',
                    'message': f'Successfully created {len(products)} products',
                    'products': ProductSerializer(products, many=True).data
                }, status=status.HTTP_201_CREATED)
        except serializer.ValidationError as e:
            return Response({
                'status': 'error',
                'errors': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)