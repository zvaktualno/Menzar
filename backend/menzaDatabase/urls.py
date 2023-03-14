from django.urls import path
from . import views

urlpatterns = [
    path('', views.indexView, name='index'),

    # FIXME: WE REALLY NEED TO REMOVE THESE TEST URLS
    path('createDB/', views.createDB, name='test'),
    path('deleteDB/', views.deleteDB, name='test2'),
    path('scrape/', views.scrapeView, name='scrape'),

    # API URLS
    # DINERS
    path(
        'diners/',
        views.DinerList.as_view(),
        name='Diners'
    ),
    path(
        'diner/<str:dinerName>/<str:dateString>/',
        views.MenuList.as_view(),
        name='Diner menus by date'
    ),

    # MENUS
    path(
        'menu/<int:menuId>/',
        views.MenuList.as_view(),
        name='Menu details'
    ),
    path(
        'menus/<int:menuId>/orders/',
        views.getMenuOrders,
        name='Orders'
    ),

    # USERS
    path(
        'user/',
        views.getUsers,
        name='Users'
    ),
    path(
        'user/<int:userId>/',
        views.getUserDetails,
        name='User details'
    ),
    path(
        'user/orders/',
        views.getUserOrders,
        name='User orders'
    ),
    path(
        'user/order/',
        view=views.userOrder,
        name='User order menu'
    ),
    path(
        'order/remove/',
        view=views.deleteUserOrder,
        name='order delete order'
    ),
    path(
        'favorite/diner',
        view=views.favoriteDiner,
        name='favorite diner'
    ),
    # ORDERS
    # path('orders/<int:orderId>/', views.getOrderDetails, name='Order details'),
    # REVIEW
    path(
        'review/add/',
        view=views.createReview,
        name='insert new review'
    )

]
