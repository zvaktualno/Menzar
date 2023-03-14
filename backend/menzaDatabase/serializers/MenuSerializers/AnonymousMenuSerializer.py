from rest_framework import serializers
from ...models import Menu, Order
from django.db.models import Avg


class AnonymousMenuSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = [
            'pk',
            'diner',
            'dish',
            'soup',
            'date',
            'stats',
        ]
        depth = 2

    def get_stats(self, obj):
        totalOrders = Order.objects.filter(menu=obj).exclude(review=None)

        # get all menus with same dish and diner
        menusWithSameDish = Menu.objects.filter(diner=obj.diner, dish=obj.dish)

        menuOrders = Order.objects.filter(
            menu__in=menusWithSameDish).exclude(review=None)

        return {
            "dishAverage": menuOrders.aggregate(Avg('review__rating'))["review__rating__avg"],
            "totalOrders": len(totalOrders),
            "totalAverage": totalOrders.aggregate(Avg('review__rating'))["review__rating__avg"]
        }
