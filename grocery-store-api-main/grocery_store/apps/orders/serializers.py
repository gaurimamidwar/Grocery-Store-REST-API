# apps/orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']
        extra_kwargs = {'price': {'read_only': True}}

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    status = serializers.CharField(read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'status', 'total_amount', 
                 'shipping_address', 'created_at', 'updated_at']

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("An order must contain at least one item.")
        
        # Verify product availability
        for item in items:
            product = item['product']
            quantity = item['quantity']
            
            if product.quantity < quantity:
                raise serializers.ValidationError(
                    f"Not enough stock for {product.name}. Available: {product.quantity}"
                )
        return items

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        total_amount = sum(
            item['product'].price * item['quantity']
            for item in items_data
        )
        
        # Create order
        validated_data['total_amount'] = total_amount
        order = Order.objects.create(**validated_data)
        
        # Create order items and update inventory
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            
            # Create order item
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )
            
            # Update product inventory
            product.quantity -= quantity
            product.save()
        
        return order