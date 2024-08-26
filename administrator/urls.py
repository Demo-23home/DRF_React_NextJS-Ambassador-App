from django.urls import path, include
from . import views

urlpatterns = [
    path("", include("common.urls")),
    path("ambassadors/", views.AmbassadorsAPIView.as_view()),
    path("products/", views.ProductGenericAPIView.as_view()),
    path("products/<int:pk>/", views.ProductGenericAPIView.as_view()),
]
