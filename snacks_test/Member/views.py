import hashlib
from random import randint

from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.template import context
from django.urls import reverse

from Tmp.models import User, Order_Commodity, Order, Address
from Member.forms import UserForm, ChangeForm, GetForm
from Member.yanzheng import send_sms
from snacks_test import settings


def index(request):
    return render(request, 'Member/user_index.html', {'username': request.session.get('username')})
    # return render(request, 'base.html')


# # 获取验证码
# def generate_code(request):
#     username = request.POST.get('username')
#     password = request.POST.get('password')
#     confirm_password = request.POST.get('confirm_password')
#     verification = randint(100000, 999999)
#     request.session['verification'] = verification
#     request.session['username'] = username
#     request.session['password'] = password
#     request.session['confirm_password'] = confirm_password
#     send_mail('验证信息', '您的验证码为{},请您及时注册'.format(verification), settings.EMAIL_FROM, ['2567317859@qq.com'])
#     return render(request, 'Member/register.html', **locals())


# 注册
def register(request):
    form = UserForm()
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        user = User()
        form = UserForm(request.POST)
        if form.is_valid():
            print(request.session.get('verification23342'))
            if not request.POST.get('yzm'):
                verification = randint(10000, 999999)
                request.session['verification'] = verification
                if username.isdigit():
                    send_sms(username, {'number': verification})
                else:
                    send_mail('验证信息', '您的验证码为{},请您及时注册'.format(verification), settings.EMAIL_FROM,
                              [username])
                return render(request, 'Member/register.html', context={
                    'form': form,
                    'username': username,
                    'password': password,
                    'confirm_password': confirm_password,
                })
            elif int(request.POST.get('yzm')) != request.session.get('verification'):
                print(request.POST.get('yzm'), type(request.POST.get('yzm')))
                print(request.session.get('verification'), type(request.session.get('verification')))
                return render(request, 'Member/register.html', {'msg': '您输入的验证码有误，请重新注册'})
            else:
                print(username, password)
                password = hashlib.sha1(password.encode('utf8')).hexdigest()
                user.password_hash = password
                if username.isdigit():
                    user.telephone = username
                    user.registration_number = username
                else:
                    user.email = username
                    user.registration_number = username
                user.save()
                return render(request, 'App/product/index.html')
        return render(request, 'Member/register.html', {'form': form})
    return render(request, 'Member/register.html', {'form': form})


# 修改密码
def password(request):
    form = ChangeForm()
    if request.method == 'POST':
        form = ChangeForm(request.POST)
        if form.is_valid():
            old_value = request.session.get('username')
            old_password = hashlib.sha1(request.POST.get('old_password').encode('utf8')).hexdigest()
            new_password = hashlib.sha1(request.POST.get('new_password').encode('utf8')).hexdigest()
            if old_value.isdigit():
                res = User.objects.filter(telephone__contains=old_value).first()
            else:
                res = User.objects.filter(email__contains=old_value).first()
            if res.password_hash != old_password:
                return render(request, 'Member/change_password.html', {'msg': '您输入的原密码有误'})
            elif old_password == new_password:
                return render(request, 'Member/change_password.html', {'msg1': '您输入的新密码与旧密码一致'})
            res.password_hash = new_password
            res.save()
            return redirect(reverse('member:logout'))
        return render(request, 'Member/change_password.html', {'username': request.session.get('username'), 'form': form})
    return render(request, 'Member/change_password.html', {'username': request.session.get('username'), 'form': form})


# 登录
def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        password = hashlib.sha1(password.encode('utf8')).hexdigest()
        print(username, password)
        if username.isdigit():
            res = User.objects.filter(telephone__contains=username, password_hash__contains=password)
        else:
            res = User.objects.filter(email__contains=username, password_hash__contains=password)
        if len(res) > 0:
            request.session['username'] = username
            return redirect(reverse('tmp:index'))
        return redirect(reverse('member:login'))
    return render(request, 'Member/login.html')


# 退出
def logout(request):
    response = redirect(reverse('tmp:index'))
    request.session.flush()
    return response


# 找回密码
def getpassword(request):
    form = GetForm()
    if request.method == 'POST':
        form = GetForm(request.POST)
        if form.is_valid():
            newpassword = hashlib.sha1(b'a123').hexdigest()
            username = request.POST.get('username')
            email = request.POST.get('email')
            if username.isdigit():
                user = User.objects.filter(telephone__contains=username).first()
            else:
                user = User.objects.filter(email__contains=username).first()
            user.password_hash = newpassword
            user.save()
            send_mail('找回密码', '您的密码已重置，新密码为{}'.format('a123'), settings.EMAIL_FROM, [email])
            return render(request, 'base.html')
    return render(request, 'Member/getpassword.html', {'form': form})


# 我的订单
def order_list(request):
    username = request.session.get('username')
    if username.isdigit():
        user = User.objects.filter(telephone__contains=username).first()
    else:
        user = User.objects.filter(email__contains=username).first()
    order = Order.objects.filter(uid=user.id).all()
    print(order, 'ceshishuju')
    if len(order) == 0:
        print(order, '测试数据')

        return render(request, 'Member/order_list.html', {'username': username, 'order': order})
    else:
        print(order[0])
        order_commoditys = []
        for i in range(0, len(order)):
            order_commodity = Order_Commodity.objects.filter(oid=order[i].id).all()
            for j in range(0, len(order_commodity)):
                print(order_commodity)
                order_commodity1 = order_commodity[j]
                order_commoditys.append(order_commodity1)
                queryset = Order_Commodity.objects.filter(pk__in=[x.pk for x in order_commoditys])
                if j == len(order_commodity) - 1:
                    if i == len(order) - 1:
                        return render(request, 'Member/order_list.html', {
                            'username': username,
                            'order': order,
                            'order_commodity': queryset,
                        })


# 历史订单
def old_list(request):
    username = request.session.get('username')
    if username.isdigit():
        user = User.objects.filter(telephone__contains=username).first()
    else:
        user = User.objects.filter(email__contains=username).first()
    order = Order.objects.filter(uid=user.id).all()
    if len(order) == 0:
        return render(request, 'Member/order_oldlist.html', {'username': username, 'order': order})
    else:
        order_commoditys = []
        for i in range(0, len(order)):
            order_commodity = Order_Commodity.objects.filter(oid=order[i].id).all()
            for j in range(0, len(order_commodity)):
                print(order_commodity)
                order_commodity1 = order_commodity[j]
                order_commoditys.append(order_commodity1)
                queryset = Order_Commodity.objects.filter(pk__in=[x.pk for x in order_commoditys])
                if j == len(order_commodity) - 1:
                    if i == len(order) - 1:
                        return render(request, 'Member/order_oldlist.html', {
                            'username': username,
                            'order': order,
                            'order_commodity': queryset,
                        })


# 我的收藏
def collection(request):
    return render(request, 'Member/collection_list.html', {'username': request.session.get('username')})


# 个人信息
def profile(request):
    return render(request, 'Member/profile.html', {'username': request.session.get('username')})


# 收货信息
def address(request):
    username = request.session.get('username')
    if username.isdigit():
        res = User.objects.filter(telephone__contains=username).first()
    else:
        res = User.objects.filter(email__contains=username).first()
    my_address = Address.objects.filter(uid=res.id).all()
    return render(request, 'Member/address_list.html', {'username': username,
                                                        'my_address': my_address,
                                                        })


# 填写订单
def address_write(request):
    username = request.session.get('username')
    if request.method == 'POST':
        if username.isdigit():
            res = User.objects.filter(telephone__contains=username).first()
        else:
            res = User.objects.filter(email__contains=username).first()
        my_address = Address()
        my_address.receive = request.POST.get('username')
        my_address.address = request.POST.get('address')
        my_address.telephone = request.POST.get('phone')
        my_address.fixed_phone = request.POST.get('home_phone')
        my_address.email = request.POST.get('email')
        my_address.uid = res.id
        my_address.save()
        return redirect(reverse('member:address'))
    return render(request, 'Member/address_write.html', {'username': username})


# 订单速查
def dingdan(request):

    return render(request, 'Member/dingdan.html', {'username': request.session.get('username')})


