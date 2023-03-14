from datetime import datetime
from backend.settings import DINER_SCRAPERS
from django.http import HttpResponse
from .setupDatabase import *
from language import *
from django.utils import timezone
import json
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from .serializers.MenuSerializers.DefaultMenuSerializer import DefaultMenuSerializer
from .serializers.DinerSerializers.AnonymousDinerSerializer import AnonymousDinerSerializer
from .serializers.DinerSerializers.UserDinerSerializer import UserDinerSerializer
from .serializers.MenuSerializers.AnonymousMenuSerializer import AnonymousMenuSerializer
from .serializers.MenuSerializers.UserMenuSerializer import UserMenuSerializer


from .serializers.serializers import OrderSerializer, ReviewSerializer

from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class DinerList(generics.ListAPIView):
    queryset = Diner.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):

        # TODO: removeme
        if len(Menu.objects.filter(date=timezone.now().date())) == 0:
            scrapeView(None)

        user = self.request.user
        if user.is_authenticated:
            return UserDinerSerializer
        else:
            return AnonymousDinerSerializer


class MenuList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        kwargs = dict()

        # TODO: This kinda wack
        if 'menuId' in self.kwargs:
            kwargs['pk'] = self.kwargs.get('menuId', None)

        if 'dinerName' in self.kwargs and 'dateString' in self.kwargs:
            dateString = self.kwargs['dateString']
            diner = Diner.objects.filter(name=self.kwargs['dinerName'])
            if len(diner) == 0:
                diner = None

            # convert date string to date object
            date = None
            if dateString == "today":
                date = timezone.now().date()
            else:
                date = datetime.strptime(dateString, '%d-%m-%Y').date()

            kwargs['diner'] = diner.first()
            kwargs['date'] = date

        menus = Menu.objects.filter(**kwargs)
        return menus

    def get_serializer_class(self):
        user = self.request.user
        if user.is_authenticated:
            return UserMenuSerializer
        else:
            return AnonymousMenuSerializer


@api_view(['POST'])
def userOrder(request):
    '''
        Creates an order for a given user and menu
    '''
    user = User.objects.filter(username=request.user)
    if len(user) == 0:
        return HttpResponse(USER_NOT_FOUND)
    print(request.data)
    menu = Menu.objects.filter(pk=request.data["menu_pk"])

    if len(menu) == 0:
        return HttpResponse(MENU_NOT_FOUND)

    if len(menu) > 1:
        return HttpResponse(MENU_INVALID)

    try:
        order = Order.objects.get(user=user.first(), menu=menu.first())
        return HttpResponse(ORDER_ALREADY_EXISTS)
    except Order.DoesNotExist:
        order = Order(user=user.first(), menu=menu.first())
        order.save()
    return HttpResponse("Order created successfully.")


def getMenuOrders(request, menuId):
    '''
        Returns all orders for a given menu
    '''
    return HttpResponse("API not implemented yet.")


def getUsers(request):
    '''
        Returns all users in the database
    '''
    # Probably need to add some kind of authentication or even not implement this
    return HttpResponse("API not implemented yet.")


def getUserDetails(request, userId):
    '''
        Gets all details of a given user
    '''
    return HttpResponse("API not implemented yet.")


@api_view(['GET'])
def getUserOrders(request):
    '''
        Gets all orders of a given user
    '''
    user = User.objects.filter(username=request.user)
    if len(user) == 0:
        return HttpResponse(USER_NOT_FOUND)

    orders = Order.objects.filter(user=user.first()).order_by('-timestamp')
    serializedData = OrderSerializer(orders, many=True).data
    return HttpResponse(json.dumps(serializedData, cls=DjangoJSONEncoder))


@api_view(['DELETE'])
def deleteUserOrder(request):
    print(request.data)
    orders = Order.objects.filter(
        pk=request.data['order_pk'], user=request.user)
    if not len(orders) == 0:
        orders.first().delete()
        return HttpResponse("order deleted")
    else:
        return HttpResponse("order doesn't exist")
    


@api_view(['POST', 'DELETE'])
def favoriteDiner(request):
    '''
        Change favorite diner for a given user
    '''
    dinerName = request.data['diner']
    print(request.user)
    user = User.objects.filter(username=request.user)
    if len(user) == 0:
        return HttpResponse(USER_NOT_FOUND)

    diner = Diner.objects.filter(name=dinerName)
    if len(diner) == 0:
        return HttpResponse(DINER_NOT_FOUND)

    if request.method == 'DELETE':
        favoriteDiner = FavoriteDiner.objects.filter(
            user=user.first(), diner=diner.first())
        if len(favoriteDiner) == 0:
            return HttpResponse(DINER_NOT_FOUND)
        favoriteDiner.first().delete()
        return HttpResponse("Diner removed from favorites")

    else:
        favoriteDiner = FavoriteDiner(user=user.first(), diner=diner.first())
        favoriteDiner.save()
        return HttpResponse("Diner added to favorites")


# HELPER VIEWS
def indexView(request):
    '''
        Index view for the API
    '''
    return HttpResponse("Hello, world. You're at the API index.")
    diners = Diner.objects.all()

    rawData = serializers.serialize('python', list(diners))
    filteredData = [d['fields'] for d in rawData]
    return HttpResponse(json.dumps(filteredData, cls=DjangoJSONEncoder), content_type="application/json")


def createDB(request):
    createDatabase()
    return HttpResponse("Database created")


def deleteDB(request):
    deleteDatabase()
    return HttpResponse("Database deleted")


def scrapeView(request):
    menus = DINER_SCRAPERS.getMenus()
    response = ""

    for menu in menus:
        response += f"{menu.dinerName} / {menu.soupString} / {menu.dishString}<br>"

    for menu in menus:
        diner = Diner.objects.get(name=menu.dinerName)

        soup = None
        try:
            soup = Soup.objects.get(name=menu.soupString)
        except Soup.DoesNotExist:
            soup = Soup(name=menu.soupString)
            soup.save()

        dish = None

        try:
            dish = Dish.objects.get(name=menu.dishString)
        except Dish.DoesNotExist:
            dish = Dish(name=menu.dishString)
            dish.save()

        try:
            Menu.objects.get(diner=diner, soup=soup, dish=dish,
                             date=timezone.now().date())
        except Menu.DoesNotExist:
            menu = Menu(diner=diner, soup=soup, dish=dish,
                        date=timezone.now().date())
            menu.save()

    return HttpResponse(response)


@api_view(['POST'])
def createReview(request):
    """
    First checks if a review with the given ID already exists.
    If it does, it updates the existing review.
    If it doesn't, it creates a new review.
    """

    reviewID = request.data.get('review')
    review = Review.objects.filter(pk=reviewID)

    serializer = None
    if len(review) == 0:
        serializer = ReviewSerializer(data=request.data)
    else:
        serializer = ReviewSerializer(
            instance=review.first(), data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return HttpResponse(serializer.data)
