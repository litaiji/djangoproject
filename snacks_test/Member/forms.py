import re

from django import forms
from django.core.exceptions import ValidationError
# from django.http import request

from Tmp.models import User


def check_password(password):
    if re.match(r'\d+$', password):
        raise ValidationError("密码不能是纯数字")


# 注册
class UserForm(forms.Form):
    username = forms.CharField(label='用户名:',
                               error_messages={
                                   'required': '用户名或邮箱必须输入',
                                   'max_length': '用户名最大20字符',
                                   'min_length': '用户名最少3个字符'
                               })

    password = forms.CharField(label='密码',
                               max_length=128,
                               min_length=3,
                               widget=forms.PasswordInput(attrs={
                                   'placehold': '请输入密码',
                                   'class': 'password'
                               }),
                               error_messages={
                                   'required': '密码必须输入',
                                   'max_length': '密码最大20字符',
                                   'min_length': '密码最少3个字符'
                               },
                               validators=[check_password]
                               )
    confirm_password = forms.CharField(label='密码',
                                       max_length=128,
                                       min_length=3,
                                       widget=forms.PasswordInput(attrs={
                                           'placehold': '请输入密码',
                                           'class': 'password'
                                       }),
                                       error_messages={
                                           'required': '密码必须输入',
                                           'max_length': '密码最大20字符',
                                           'min_length': '密码最少3个字符'
                                       },
                                       validators=[check_password]
                                       )
    # gender = forms.ChoiceField(label='性别',
    #                            choices=[('0', '女'), (1, '男'), (2, '保密')],
    #                            initial=2,  # 初始值为保密
    #                            widget=forms.RadioSelect,
    #                            error_messages={
    #                                'required': '请填入性别',
    #                                'invalid_choice': '无效选择',
    #                            }
    #                            )
    # phone = forms.CharField(label='手机号:',
    #                         min_length=11,
    #                         max_length=11,
    #                         error_messages={
    #                             'required': '手机号必须输入',
    #                             'max_length': '手机号长度最大11位',
    #                             'min_length': '手机号长度必须是11位',
    #                         }
    #                         )

    # 自定义验证字段
    # 方法名规则：clean_字段名
    def clean_username(self):
        # 必须使用clean_data获取数据
        value = self.cleaned_data.get('username')
        print(type(value))
        if value.isdigit():
            if re.match(r'1[3,5,6,7,8,9]\d{9}$', value):
                res = User.objects.filter(telephone__contains=value)
                if res:
                    raise ValidationError('用户已存在')
                else:
                    return value
            raise ValidationError('请输入有效的手机号码')
        else:
            if re.match(r'^[_a-z0-9-\.]+@([-a-z0-9]+\.)+[a-z]{2,}$', value):
                res = User.objects.filter(email__contains=value)
                if res:
                    raise ValidationError('用户已存在')
                else:
                    return value
            raise ValidationError('请输入有效的邮箱地址')

    # 全局验证钩子函数
    def clean(self):
        password1 = self.cleaned_data.get('password')
        password2 = self.cleaned_data.get('confirm_password')
        if password1 == password2:
            return self.cleaned_data
        raise ValidationError({'confirm_password': '两次密码不一致'})


# 修改密码
class ChangeForm(forms.Form):
    old_password = forms.CharField(label='输入原密码',
                                   max_length=128,
                                   min_length=3,
                                   widget=forms.PasswordInput(attrs={
                                       'placehold': '请输入密码',
                                       'class': 'password'
                                   }),
                                   error_messages={
                                       'required': '密码必须输入',
                                       'max_length': '密码最大20字符',
                                       'min_length': '密码最少3个字符'
                                   },
                                   validators=[check_password]
                                   )
    new_password = forms.CharField(label='新密码',
                                   max_length=128,
                                   min_length=3,
                                   widget=forms.PasswordInput(attrs={
                                       'placehold': '请输入密码',
                                       'class': 'password'
                                   }),
                                   error_messages={
                                       'required': '密码必须输入',
                                       'max_length': '密码最大20字符',
                                       'min_length': '密码最少3个字符'
                                   },
                                   validators=[check_password]
                                   )
    confirm_password = forms.CharField(label='密码',
                                       max_length=128,
                                       min_length=3,
                                       widget=forms.PasswordInput(attrs={
                                           'placehold': '请输入密码',
                                           'class': 'password'
                                       }),
                                       error_messages={
                                           'required': '密码必须输入',
                                           'max_length': '密码最大20字符',
                                           'min_length': '密码最少3个字符'
                                       },
                                       validators=[check_password]
                                       )
    change_password = forms.CharField(widget=forms.HiddenInput())

    # def clean_change_password(self, ):
    #     old_value = self.cleaned_data.get('change_password')
    #     print(old_value, type(old_value))
    #


    def clean(self):
        password1 = self.cleaned_data.get('new_password')
        password2 = self.cleaned_data.get('confirm_password')
        if password1 == password2:
            return self.cleaned_data
        raise ValidationError({'confirm_password': '两次密码不一致'})
        # if password1 == password2:
        #     return self.cleaned_data
        # raise ValidationError({'confirm_password': '两次密码不一致'})


class GetForm(forms.Form):
    username = forms.CharField(label='用户名:',
                               error_messages={
                                   'required': '用户名或邮箱必须输入',
                                   'max_length': '用户名最大20字符',
                                   'min_length': '用户名最少3个字符'
                               })
    email = forms.CharField(label='邮箱:',
                               error_messages={
                                   'required': '邮箱必须输入',
                               })
    def clean_username(self):
        # 必须使用clean_data获取数据
        value = self.cleaned_data.get('username')
        print(type(value))
        if value.isdigit():
            if re.match(r'1[3,5,6,7,8,9]\d{9}$', value):
                res = User.objects.filter(telephone__contains=value)
                if not res:
                    raise ValidationError('用户名错误，该用户不存在')
                else:
                    return value
            raise ValidationError('请输入有效的手机号码')
        else:
            if re.match(r'^[_a-z0-9-\.]+@([-a-z0-9]+\.)+[a-z]{2,}$', value):
                res = User.objects.filter(email__contains=value)
                if not res:
                    raise ValidationError('用户名错误，该用户不存在')
                else:
                    return value
            raise ValidationError('请输入有效的邮箱号码')


    def clean_email(self):
        email = self.cleaned_data.get('email')
        if re.match(r'^[_a-z0-9-\.]+@([-a-z0-9]+\.)+[a-z]{2,}$', email):
            return email
        raise ValidationError('请输入有效的邮箱地址')


