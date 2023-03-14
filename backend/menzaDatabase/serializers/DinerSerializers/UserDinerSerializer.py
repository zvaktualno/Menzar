from rest_framework import serializers
from ...models import Diner, FavoriteDiner


class UserDinerSerializer(serializers.ModelSerializer):
    favorite = serializers.SerializerMethodField()

    class Meta:
        model = Diner
        fields = ['name', 'display_name', 'favorite']
        depth = 1

    def get_favorite(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return FavoriteDiner.objects.filter(diner=obj, user=request.user).exists()
        return False
