from django.urls import path, include

from lingshi_admin import views

app_name = 'lingshi_admin'

urlpatterns = [
    path('index/', views.index, name='index'),

    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),

    path('category/', views.category, name='category'),
    path('delcategory/', views.delcategory, name='delcategory'),
    path('province/', views.ajax_province, name='province'),
    path('city/', views.ajax_city, name='city'),

    path('users/', views.users, name='users'),
    path('users/<page>/', views.users, name='users'),

    path('del_user/', views.deluser, name='deluser'),
    path('blacklist/', views.blacklist, name='blacklist'),
    path('blacklist/<page>/', views.blacklist, name='blacklist'),
    path('deleteuser/', views.deleteuser, name='deleteuser'),

    path('compile/', views.compile, name='compile'),



]
