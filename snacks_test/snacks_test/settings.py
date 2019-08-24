"""
Django settings for snacks_test project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'nxbc-$rllrq+!)(l1q6!$c=+)b6%pl65ave4c$sqwcsct0)f+('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Tmp.apps.TmpConfig',
    'Member',
    'rest_framework',
    'lingshi_admin'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'snacks_test.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'snacks_test.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'lingshi_end',
        'USER': 'root',
        'PASSWORD': '123',
        'HOST': '10.0.108.74',
        # 'HOST': '192.168.43.3',
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/


STATIC_URL = '/static/'

# 静态资源
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]

# 邮件发送设置
# smtp服务的邮箱服务器器
EMAIL_HOST = 'smtp.163.com'
# smtp服务固定的端口口是25
EMAIL_PORT = 25
# 发送邮件的邮箱
EMAIL_HOST_USER = 'han_pengda@163.com'
# 在邮箱中设置的客户端授权密码
EMAIL_HOST_PASSWORD = 'han123'
# 收件人人看到的发件人人 <此处要和发送邮件的邮箱相同>
EMAIL_FROM = '用户注册<han_pengda@163.com>'

# 阿里云短信验证码配置
# SMS_CONFIG = {
#     'ACCESS_KEY_ID': "LTAIBfz7LFiQiXnq",
#     'ACCESS_KEY_SECRET': "4Kr37w6RFE5f6TbwCoMHvHYbQvvM2S",
#     'SignName': "hanpd",
#     'TemplateCode': "SMS_163437175"
# }
SMS_CONFIG = {
    'ACCESS_KEY_ID': "LTAIDHOYSjYcvyVt",
    'ACCESS_KEY_SECRET': "qrEgykmXX4e6GUMFOqzuiLZ5gsUxSC",
    'SignName': "成少雷",
    'TemplateCode': "SMS_102315005"
}
# SMS_CONFIG = {
#     'ACCESS_KEY_ID': "LTAIVIzuYaX6O2FL",
#     'ACCESS_KEY_SECRET': "HkpjofAvx3Jyb8Hn6dOJ9NAWQsEPrQ",
#     'SignName': "lxy1905",
#     'TemplateCode': "SMS_161570301"
# }



# ＃确保您的密钥文件符合标准。
APP_PRIVATE_KEY =  open(os.path.join(BASE_DIR,'alipay/app_private_key.pem')).read()
ALIPAY_PUBLIC_KEY  =  open(os.path.join(BASE_DIR,'alipay/alipay_public_key.pem')).read()
ALI_APP_ID = "2016101400681712"

# 支付路由

PAY_URL =  "https://openapi.alipaydev.com/gateway.do?app_id=2016101400681712&biz_content=%7B%22subject%22%3A%22macpro%22%2C%22out_trade_no%22%3A%22201906190011000%22%2C%22total_amount%22%3A5000%2C%22product_code%22%3A%22FAST_INSTANT_TRADE_PAY%22%7D&charset=utf-8&method=alipay.trade.page.pay&notify_url=http%3A%2F%2F127.0.0.1%3A8000%2Ftmp%2Fpay&return_url=http%3A%2F%2F127.0.0.1%3A8000%2Ftmp%2Fpay&sign_type=RSA2&timestamp=2019-08-23+20%3A26%3A03&version=1.0&sign=Q50YEyS6QQxxnzYEyUgrrUrSX%2FXee58K9A%2BPKHrnIhm7pJn8xBzMNR4NzW0JKoBQRBQGdNQnnGx7DdDLPm6JCKmL4InfUVs4Zp5wgwDTSsH3F6OyivpSzHEDUiKTjgOLhbKyKdjOm8OAPQyzQn4qWZzNSTOJ%2F90RNbv3M5Bc8V25qoh4euqEiDtlLcT1ftT9iavSIRQIek%2BbxBsGtGoFfG%2Ba%2FeuqHROsdIOIauzGcRE9ZM378MS9TGFbs297F3n7aVRx116e9lewAaQgzsYj6z0al4yxK3DVb3NbE%2Bg8cSokQudd1nCLhSbg2neKs7WcXF3NYIScxnXoHA1KHalR9w%3D%3D"


# 上传文件
MEDIA_URLS = '/static/admin/upload/'
MEDIA_ROOTS = os.path.join(BASE_DIR,'static/admin/upload/chathead/')


# 上传图片参数
UPLOAD_PATH = '/static/admin/upload/'
ALLOWED_FILEEXTS = ['.png','.jpeg','.jpg','.gif','.bmp']