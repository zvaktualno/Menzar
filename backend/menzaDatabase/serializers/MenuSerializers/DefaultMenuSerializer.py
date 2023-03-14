from rest_framework import serializers
from ...models import Menu


class DefaultMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['pk', 'diner', 'dish', 'soup', 'date']
        depth = 1
