import hashlib
from datetime import datetime

from django.core.paginator import Paginator
from django.db import connection
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from lingshi_admin.upload_files import route, upload_files
from Tmp.models import *


# Create your views here.
def index(request):
    time =datetime.now().timestamp()
    print('date',time,type(time))
    id = request.GET.get('id')
    uid = request.session.get('uid')
    user_user = User.objects.filter(pk=uid).first()
    if id == '2':
        dd = 2
        return render(request, 'admin/index.html',locals())
    else:
        dd = 1
        return render(request, 'admin/index.html', locals())


def category(request):
    Dcategory_list = Goods_Category.objects.filter(parentid=0).all()
    Xcategory_list = Goods_Category.objects.filter(parentid__gt=0).all()
    if request.method == 'GET':
        return render(request, 'admin/category.html',locals())
    else:
        Dcategory = request.POST.get('select_add_category')
        category = request.POST.get('input_add_category')
        inquire_category = Goods_Category.objects.filter(category=category).exists()
        if not category:
            msg = '不能为空'
            return render(request, 'admin/category.html', locals())
        elif inquire_category:
            msg = '已有该板块'
            return render(request, 'admin/category.html', locals())

        elif Dcategory.isdigit():  # 如果是int，则添加小版块
            new_category = Goods_Category()
            new_category.category = category
            new_category.parentid = Dcategory
            new_category.save()
            msg = '添加小版块成功'
            return render(request, 'admin/category.html', locals())
        elif isinstance(Dcategory,str):  # 否则添加大版块
            new_category = Goods_Category()
            new_category.category = category
            new_category.parentid = 0
            new_category.save()
            msg = '添加大版块成功'
            return render(request, 'admin/category.html', locals())


@csrf_exempt
def ajax_province(request):
    with connection.cursor() as c:
        c.execute("select id,category from goods_category where parentid=0")
        provinces = c.fetchall()
    return JsonResponse(provinces,safe=False)


@csrf_exempt
def ajax_city(request):
    print(request)
    for key in request.POST:
        keydict=eval(key)
        id = int(keydict["id"])
    with connection.cursor() as c:
        c.execute("select id,category from goods_category where parentid=%d" %id)
        citys = c.fetchall()
    return JsonResponse(citys,safe=False)


def delcategory(request):
    if request.method == 'POST':
        select_1_del_category = request.POST.get('select_1_del_category')
        select_2_del_category = request.POST.get('select_2_del_category')
        if select_1_del_category.isdigit() and not select_2_del_category.isdigit():
            goods = Goods_Category.objects.filter(pk=int(select_1_del_category)).first()
            goods.delete()
            goods_list = Goods_Category.objects.filter(parentid=int(select_1_del_category))
            for good in goods_list:
                good.delete()
        elif select_1_del_category.isdigit() and select_2_del_category.isdigit():
            goods = Goods_Category.objects.filter(pk=int(select_2_del_category)).first()
            print(goods)
            goods.delete()

    return redirect('admin:category')


def users(request,page=1):
    user_list = User.objects.all()

    # 1 创建分页器
    paginator = Paginator(user_list, 3)
    # 2 创建分页对象
    page = int(page)
    pagination = paginator.page(page)

    # 3 自定义页码范围
    if paginator.num_pages > 10:
        # 如果当前页码-5小于0
        if page - 5 <= 0:
            pagerange = range(1, 11)
        elif page + 4 > paginator.num_pages:
            pagerange = range(paginator.num_pages - 9, paginator.num_pages + 1)
        else:
            pagerange = range(page - 5, page + 5)
    else:  # 页码总数小于10
        pagerange = paginator.page_range

    return render(request,'admin/users_list.html',locals())


def deluser(request):
    uid = request.GET.get('id')
    print('------',uid)
    user = User.objects.get(pk=uid)
    isactivation = user.isactivation
    if isactivation == 1:
        user.isactivation = 0
        user.save()
        return redirect('admin:users')
    elif isactivation == 0:
        user.isactivation = 1
        user.save()
        return redirect('admin:users')


def blacklist(request,page=1):
    user_list = User.objects.filter(isactivation=0).all()

    # 1 创建分页器
    paginator = Paginator(user_list, 3)
    # 2 创建分页对象
    page = int(page)
    pagination = paginator.page(page)

    # 3 自定义页码范围
    if paginator.num_pages > 10:
        # 如果当前页码-5小于0
        if page - 5 <= 0:
            pagerange = range(1, 11)
        elif page + 4 > paginator.num_pages:
            pagerange = range(paginator.num_pages - 9, paginator.num_pages + 1)
        else:
            pagerange = range(page - 5, page + 5)
    else:  # 页码总数小于10
        pagerange = paginator.page_range

    return render(request,'admin/blacklist.html',locals())


def deleteuser(request):
    uid = request.GET.get('id')
    user = User.objects.get(pk=uid)
    user.delete()
    return redirect('admin:blacklist')


def compile(request):
    request.session['user_id'] = 3
    user_id = request.session['user_id']
    uid = request.GET.get('id')

    if uid:
        user = User.objects.get(pk=uid)
        user_info = User_Info.objects.filter(uid_id=uid).first()
    elif user_id:
        user = User.objects.get(pk=user_id)
        user_info = User_Info.objects.filter(uid_id=user_id).first()
    if request.method == 'GET':
        return render(request, 'admin/compile.html',locals())
    else:
        nickname = request.POST.get('nickname')
        password = request.POST.get('password')
        repassword = request.POST.get('repassword')
        usertype = request.POST.get('usertype')
        age = request.POST.get('age')
        birthday = request.POST.get('birthday')
        native_place = request.POST.get('native_place')
        signature = request.POST.get('signature')
        chathead = request.FILES.get('chathead')

        if password == repassword:
            user.password_hash = hash_code(password)
            user.usertype = int(usertype)
            user.save()
            user_info.nickname = nickname
            user_info.age = int(age)
            user_info.birthday = birthday
            user_info.native_place = native_place
            user_info.save()
            if signature:
                user_info.signature = signature
                user_info.save()
            else:
                user_info.signature = user_info.signature
                user_info.save()
            if chathead:
                path = route(chathead)
                if path:
                    # print('--b--', path)
                    res = str(path).partition('static/admin/')
                    # print('--c--', res[2])
                    result = upload_files(chathead, path)
                    if result:
                        user_info.chathead = res[2]
                        user_info.save()
                    # chathead_msg = '上传失败'
                    return render(request, 'admin/compile.html', locals())
                chathead_msg = '文件格式不正确'
                return render(request, 'admin/compile.html', locals())
            else:
                user_info.chathead = user_info.chathead
                user_info.save()

            msg = '修改成功'
            return render(request, 'admin/compile.html', locals())
        else:
            password_msg = '密码输入不一致'
            return render(request, 'admin/compile.html', locals())


# 加密密码
def hash_code(s, salt='mysite_login'):
    h = hashlib.sha256()
    s += salt
    h.update(s.encode())  # update方法只接收bytes类型
    return h.hexdigest()


def login(request):
    if request.method == 'GET':
        return redirect('admin:index')
    else:
        registration_number = request.POST.get('registration_number')
        password = request.POST.get('password')
        user = User.objects.filter(registration_number=registration_number).first()
        if user:
            if user.password_hash == hash_code(password):
                # time =datetime.now().timestamp()
                request.session['datetime'] = datetime.now().timestamp()
                request.session['uid'] = user.id
                request.session['is_login'] = True
                request.session['registration_number'] = user.registration_number
                request.session['usertype'] = user.usertype
                # request.session['chathead'] = user.user_info.chathead
                return redirect('admin:index')
            msg = '密码错误'
            return render(request, 'admin/index.html', locals())
        msg = '用户名错误'
        return render(request,'admin/index.html',locals())


def register(request):
    if request.method == 'GET':
        return redirect('admin:index')
    else:
        registration_number = request.POST.get('registration_number')
        password = request.POST.get('password')
        repassword = request.POST.get('repassword')
        usertype = request.POST.get('user_type')
        use = User.objects.filter(registration_number=registration_number).first()
        print(registration_number)
        print(password)
        print(usertype)
        if not use:
            print('user')
            if password == repassword:
                print('pass')
                user = User()
                user.registration_number = registration_number
                user.password_hash = hash_code(password)
                user.isactivation = 1
                user.usertype = int(usertype)
                user.isdel = 1
                user.save()
                user_info = User_Info()
                user_info.uid_id = user.id
                user_info.save()
                request.session['datetime'] = datetime.now().timestamp()
                request.session['uid'] = user.id
                request.session['is_login'] = True
                request.session['registration_number'] = user.registration_number
                request.session['usertype'] = user.usertype
                request.session['chathead'] = user_info.chathead
                return redirect('admin:index')
            msg = '密码不一致'
            return render(request, 'admin/index.html', locals())
        msg = '用户名重复'
        return render(request, 'admin/index.html', locals())



def logout(request):
    if not request.session.get('is_login', None):
        return redirect('admin:index')
    request.session.flush()
    return redirect('admin:index')
