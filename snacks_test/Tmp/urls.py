from django.urls import path, include, re_path

from Tmp import views

app_name = 'Tmp'
urlpatterns = [
    path('base/',views.base,name='base'),
    path('',views.index, name='index'),
    # path('index/',views.index, name='index'),
    path('cuxiao/',views.cuxiao, name='cuxiao'),
    path('news/',views.news, name='news'),
    path('lingshi/<int:cid>/',views.lingshi, name='lingshi'),
    path('lingshibase/',views.lingshi_base, name='lingshibase'),
    path('test/',views.test,name='test'),
    path('ditu/',views.ditu,name='ditu'),
    path('cart/<int:cid>/',views.addcart,name='cart'),
    path('buynow/<int:cid>/',views.buynow,name='buynow'),
    path('confirm/<int:gid>/<int:bid>/',views.confirm,name='confirm'),
    path('zhifu/<int:gid>/<int:bid>/<int:cid>/',views.zhifu,name='zhifu'),
    path('doulei/',views.doulei,name='doulei'),
    path('guazi/',views.guazi,name='guazi'),
    path('haitai/',views.haitai,name='haitai'),
    path('jianguo/',views.jianguo,name='jianguo'),
    path('yu/',views.yu,name='yu'),
    path('done/',views.done,name='done'),
    path('pay/',views.ali_buy,name='pay'),
    path('search/', views.search, name='search')





]