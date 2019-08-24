from datetime import datetime
from random import randint

from alipay import AliPay
# from aliyunsdkcore.vendored.requests import Response
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.response import TemplateResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Tmp.models import *
from snacks_test.settings import ALI_APP_ID, APP_PRIVATE_KEY, ALIPAY_PUBLIC_KEY, PAY_URL


def base(request):
    return render(request, 'App/product/common/base.html')

def index(request):
    cates = Goods_Info.objects.all()
    big = Goods_Category.objects.filter(id=1)
    return render(request,'App/product/index.html',locals())


def cuxiao(request):
    return render(request,'App/product/cuxiao.html')


def news(request):
    # return HttpResponse('we')
    return render(request,'App/product/news.html')


def lingshi(request,cid):
    info = Goods_Info.objects.filter(gid=cid).first()
    cid = cid
    return render(request,'App/product/lingshi.html',locals())
    # return HttpResponse(cid)


def lingshi_base(request):
    return render(request,'App/product/common/lingshi_base.html')


def test(request):
    return render(request,'App/product/test.html')


def ditu(request):
    return render(request,'App/product/ditu.html')


def addcart(request,cid):
    # username = request.session.get('username')
    # if username:
    next = request.environ.get('HTTP_REFERER')
    print(next)
    goods = Goods_Info.objects.filter(gid=cid).first()
    cart = Cart()
    cart.gid = cid
    cart.num = 1
    cart.price = goods.sales
    # username = request.session.get('username')
    # user = User_Info.objects.filter(username=username).first()
    # cart.uid = user.id
    cart.save()
    cid = cid
    return render(request,'App/product/lingshi.html',context={'cid':cid})
    # else:
    #     return render(request,'')


def buynow(request,cid):
    info = Goods_Info.objects.filter(gid=cid).first()

    username = request.session.get('username')
    if request.method == 'POST':
        info = Goods_Info.objects.filter(gid=cid).first()
        cid = cid
        num = request.POST.get('number')
        return render(request,'App/product/cart.html',locals())
    else:
        return render(request,'App/product/cart.html')


def confirm(request,gid,bid):
    next = request.environ.get('HTTP_REFERER')
    user = request.session.get('username')
    if user:
        if user.isdigit:
            res = User.objects.filter(telephone__contains=user).first()
        else:
            res = User.objects.filter(email__contains=user).first()
        addresses = Address.objects.filter(uid=res.id).order_by('-isdefault')
        info = Goods_Info.objects.filter(gid=gid).first()
        num = bid
        # cid = cid
        return render(request,'App/product/confirm.html', locals())
    else:
        return render(request,'Member/login.html')


# 支付
def zhifu(request,gid,bid,cid):
    next = request.environ.get('HTTP_REFERER')
    user = request.session.get('username')
    num = bid  # 商品数量
    money = request.POST.get('money')
    info = Goods_Info.objects.filter(gid=gid).first()
    if user:
        if user.isdigit():
            res = User.objects.filter(telephone__contains=user).first()
        else:
            res = User.objects.filter(email__contains=user).first()
        addresses = Address.objects.filter(uid=res.id).order_by('-isdefault')
        if cid != 0:
            cid = cid
            info = Goods_Info.objects.filter(gid=gid).first()
            tmp = Address.objects.filter(uid=res.id).all()
            for tmp in tmp:
                if tmp.id == cid:
                    tmp.ishot = 2
                    tmp.save()
                else:
                    tmp.ishot = 1
                    tmp.save()
            return render(request,'App/product/confirm.html', locals())
        else:
            # address = addresses.objects.filter(ishot=2).first()
            id = res.id
            address = Address.objects.filter(uid=id).filter(ishot=2).first()
            info = Goods_Info.objects.filter(gid=gid).first()
            number = info.gnomber +  datetime.now().strftime('%Y%m%d') + str(randint(10000,100000))
            # 存到order表
            order = Order()
            order.money = money
            order.pay = '支付宝'
            order.orderkind = '1'
            order.num = num
            order.freight = '7'
            order.uid = id
            order.aid = address.id
            order.ordernumber = number
            order.save()
            # 存到Order_Commodity
            order_commodity = Order_Commodity()
            order_commodity.ordernumber = number
            order_commodity.goodsnumber = num
            order_commodity.goodsprice = info.sales
            order_commodity.discuss = '好评'
            oid = Order.objects.filter(ordernumber=number).first()
            id = oid.id
            order_commodity.oid = id
            order_commodity.gid = info.gid
            order_commodity.save()

            return render(request,'App/product/done.html',locals())
    else:
        return render(request,'Member/login.html')



def doulei(request):
    return render(request,'App/goods/doulei.html')


def guazi(request):
    return render(request, 'App/goods/guazi.html')


def haitai(request):
    return render(request, 'App/goods/haitai.html')


def jianguo(request):
    return render(request, 'App/goods/jianguo.html')


def yu(request):
    return render(request, 'App/goods/yu.html')


def done(request):
    return render(request,'App/product/done.html')


@api_view(["GET", "POST"])
def ali_buy(request):
    # order_no = "2019082102983"
    money = request.POST.get('money')
    number = request.POST.get('number')



    alipay = AliPay(
        appid=ALI_APP_ID,
        app_notify_url=None,  # 默认回调url
        app_private_key_string=APP_PRIVATE_KEY,
        # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        alipay_public_key_string=ALIPAY_PUBLIC_KEY,
        sign_type="RSA2",  # RSA 或者 RSA2
        debug=False  # 默认False
    )

    order_string = alipay.api_alipay_trade_page_pay(
        out_trade_no=str(number),
        total_amount=money,
        subject="中国零食网哈哈啊哈哈哈哈哈",
        return_url="http://127.0.0.1:8000/tmp/",
        notify_url="http://127.0.0.1:8000/tmp/"  # 可选, 不填则使用默认notify url


    )
    order = Order.objects.filter(ordernumber=number).first()
    order.usertype = 2
    order.save()
    print(order_string)

    # 支付宝网关
    net = "https://openapi.alipaydev.com/gateway.do?"

    data = {
        "msg": "ok",
        "status": 200,
        "data": {
            "pay_url": net + order_string
        }
    }

    # return Response(data)
    pay_url = net + order_string
    return redirect(pay_url, data=data)

# 搜索
def search(request):
    if request.method == 'POST':
        keywords = request.POST.get('k', None).strip()
        len_ketwords = len(keywords)
        tou = Goods_Info.objects.filter(gname__icontains=keywords).all()
        len_tou = len(tou)
        return render(request, 'App/product/search.html', locals())
    return render(request, 'App/product/search.html', locals())

