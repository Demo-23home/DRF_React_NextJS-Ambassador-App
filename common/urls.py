from django.urls import path, include
from . import views

urlpatterns = [
    path("register/", views.RegisterAPIView.as_view()),
    path("login/", views.LoginAPIView.as_view()),
    path("userinfo/", views.UserAPIView.as_view()),
    path("logout/", views.LogOutAPIView.as_view()),
    path("profile/", views.UpdateUserProfileAPIView.as_view()),
    path("password/", views.UpdateUserPasswordAPIView.as_view()),
]
