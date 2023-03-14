from django.contrib import admin

from .models import *

# Register your models here.
# TODO: change which models can the admin see (only menza_type ???)
admin.site.register(Diner)
admin.site.register(Dish)
admin.site.register(Soup)
admin.site.register(Menu)
admin.site.register(Order)
admin.site.register(Review)
admin.site.register(FavoriteDiner)
