from django.db import models
#
#
# class Goods_Category(models.Model):
#     category = models.CharField(max_length=60)
#     parentid = models.IntegerField()
#
#     def __str__(self):
#         return self.category
#
#     class Meta:
#         db_table = 'goods_category'
#
#
#
#
# class User(models.Model):
#     registration_number = models.CharField(max_length=30,null=True)
#     email = models.CharField(max_length=30, null=True, unique=True)
#     telephone = models.CharField(max_length=13, null=True, unique=True)
#     password_hash = models.CharField(max_length=128)
#     isactivation = models.NullBooleanField(default=True)
#     user_type = ((1, '管理员'), ('2', '普通用户'))
#     usertype = models.IntegerField(default=2, choices=user_type)
#     isdel = models.IntegerField(null=True)
#     class Meta:
#         db_table = 'user'
#
#
# class User_Info(models.Model):
#     nickname = models.CharField(max_length=13,null=True)         # 昵称
#     age = models.IntegerField(null=True)                        # 年龄
#     birthday = models.CharField(max_length=50,null=True)         # 生日
#     native_place = models.CharField(max_length=13,null=True)     # 籍贯
#     datetime = models.DateTimeField(auto_now_add=True) # 注册日期
#     signature = models.CharField(max_length=100,null=True)       # 签名
#     chathead = models.CharField(max_length=1000,default='upload/default.gif')        # 头像
#     uid = models.OneToOneField(User,on_delete=models.CASCADE,db_column='uid')
#
#
#     def __str__(self):
#         return self.nickname
#
#     class Meta:
#         db_table = 'user_info'
