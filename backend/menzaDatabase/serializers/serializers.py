from rest_framework import serializers
from ..models import Dish, Soup, Review, Order, User


class SoupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soup
        fields = ['name']


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        depth = 0


class OrderSerializer(serializers.ModelSerializer):
    review = ReviewSerializer(read_only=True, many=False, allow_null=True)

    class Meta:
        model = Order
        fields = ['pk', 'menu', 'review']
        depth = 2
