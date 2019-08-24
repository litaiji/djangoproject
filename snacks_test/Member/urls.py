from django.urls import path

from Member import views

app_name = 'Member'
urlpatterns = [
    path('', views.index, name='index'),
    # 注册
    path('register/', views.register, name='register'),
    # 获取验证码
    # path('code/', views.generate_code, name='generate_code'),
    # 登录
    path('login/', views.login, name='login'),
    # 退出
    path('logout/', views.logout, name='logout'),
    # 修改密码
    path('password/', views.password, name='password'),
    # 找回密码
    path('getpassword/', views.getpassword, name='getpassword'),
    # 我的订单
    path('list/', views.order_list, name='order_list'),
    # 历史订单
    path('old_list/', views.old_list, name='old_list'),
    # 我的收藏
    path('collection/', views.collection, name='collection'),
    # 个人信息
    path('profile/', views.profile, name='profile'),
    # 收货地址
    path('address/', views.address, name='address'),
    # 编辑收货地址
    path('address_write/', views.address_write, name='address_write'),
    # 查询订单
    path('dingdan/', views.dingdan, name='dingdan'),
]
