from django.urls import path, include
from . import views

urlpatterns = [
    path("", include("common.urls")),
    path("ambassadors/", views.AmbassadorsAPIView.as_view()),
    path("products/", views.ProductGenericAPIView.as_view()),
    path("products/<int:pk>/", views.ProductGenericAPIView.as_view()),
    path("links/<int:user_id>",  views.LinkAPIView.as_view()),
    path("orders/",  views.OrderAPIView.as_view()),
]
 