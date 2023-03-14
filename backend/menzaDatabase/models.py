from django.db import models
from django.core.validators import *

from django.contrib.auth.models import User


# table of diners
class Diner(models.Model):
    name = models.CharField(max_length=50)
    display_name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.display_name}"


# table of dishes
class Dish(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


# table of soups
class Soup(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


# table of all menza menus, new inserts every day
class Menu(models.Model):
    diner = models.ForeignKey(Diner, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    soup = models.ForeignKey(Soup, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self) -> str:
        return f"({self.diner}) {self.soup}, {self.dish}"


# table of orders, connecting menza menus to users
class Order(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user} ordered {self.menu}"


# table of reviews
class Review(models.Model):
    comment = models.CharField(max_length=200)
    rating = models.DecimalField(validators=[
        MinValueValidator(0), MaxValueValidator(5)], decimal_places=1, max_digits=2)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, related_name='review')

    def __str__(self) -> str:
        return f"{self.order} got {self.rating} stars with comment: {self.comment}"


class FavoriteDiner(models.Model):
    diner = models.ForeignKey(Diner, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.user} likes {self.diner}"
