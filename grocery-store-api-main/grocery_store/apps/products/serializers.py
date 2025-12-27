# apps/products/serializers.py
from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class BulkProductCreateSerializer(serializers.Serializer):
    products = serializers.ListField(
        child=serializers.DictField(),
        allow_empty=False,
        min_length=1
    )

    def validate_products(self, products):
        validated_products = []
        errors = []

        for index, product_data in enumerate(products):
            try:
                # Validate category exists
                category_id = product_data.get('category')
                try:
                    category = Category.objects.get(id=category_id)
                except Category.DoesNotExist:
                    raise serializers.ValidationError(f"Category with id {category_id} does not exist")

                # Validate other fields
                if not product_data.get('name'):
                    raise serializers.ValidationError("Name is required")
                
                if not product_data.get('price'):
                    raise serializers.ValidationError("Price is required")
                
                try:
                    price = float(product_data['price'])
                    if price <= 0:
                        raise serializers.ValidationError("Price must be greater than 0")
                except (TypeError, ValueError):
                    raise serializers.ValidationError("Invalid price format")

                try:
                    quantity = int(product_data.get('quantity', 0))
                    if quantity < 0:
                        raise serializers.ValidationError("Quantity cannot be negative")
                except (TypeError, ValueError):
                    raise serializers.ValidationError("Invalid quantity format")

                # Add validated data
                validated_products.append({
                    'name': product_data['name'],
                    'category': category,
                    'price': price,
                    'quantity': quantity,
                    'description': product_data.get('description', '')
                })

            except serializers.ValidationError as e:
                errors.append({f'product_{index}': str(e)})

        if errors:
            raise serializers.ValidationError(errors)

        return validated_products

    def create(self, validated_data):
        products_data = validated_data['products']
        products = []
        
        # Create products one by one to ensure proper category relation
        for product_data in products_data:
            product = Product.objects.create(
                name=product_data['name'],
                category=product_data['category'],
                price=product_data['price'],
                quantity=product_data['quantity'],
                description=product_data['description']
            )
            products.append(product)
        
        return products