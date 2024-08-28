from django.urls import path, include
from . import views


urlpatterns = [
    path("", include("common.urls")),
    path("products/frontend/", views.ProductFrontendAPIView),
    path("products/backend/", views.ProductBackendAPIView),
]
