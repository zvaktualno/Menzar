from rest_framework import serializers
from ...models import Diner


class AnonymousDinerSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Diner
        fields = ['name', 'display_name', 'is_favorite']
        depth = 1

    def get_is_favorite(self, obj):
        return False
