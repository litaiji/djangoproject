from django.db import models


# Create your models here.
# 用户表
class User(models.Model):
    id = models.AutoField(primary_key=True)
    registration_number = models.CharField(max_length=30,null=True)
    email = models.CharField(max_length=30, null=True, unique=True)
    telephone = models.CharField(max_length=13, null=True, unique=True)
    password_hash = models.CharField(max_length=128)
    isdel = models.IntegerField(null=True)
    isactivation = models.NullBooleanField(default=True)
    user_type = ((1, '管理员'), ('2', '普通用户'))
    usertype = models.IntegerField(default=2, choices=user_type)

    class Meta:
        db_table = 'user'


# 用户信息表
class User_Info(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=13)
    realname = models.CharField(max_length=30)
    sex_type = ((0, '女'), ('1', '男'), ('2', '保密'))
    sextype = models.IntegerField(default=2, choices=sex_type)
    birthday = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    address = models.CharField(max_length=300)
    qq = models.CharField(max_length=13, null=True)
    home_phone = models.CharField(max_length=20, null=True)
    office_phone = models.CharField(max_length=20, null=True)
    msn = models.CharField(max_length=30, null=True)
    email = models.CharField(max_length=30)
    userid = models.IntegerField()

    class Meta:
        db_table = 'user_info'


# 地址表
class Address(models.Model):
    id = models.AutoField(primary_key=True)
    receive = models.CharField(max_length=30)
    # receive_address = models.CharField(max_length=100)
    address = models.CharField(max_length=300)
    telephone = models.CharField(max_length=13, null=True)
    fixed_phone = models.CharField(max_length=20, null=True)
    email = models.CharField(max_length=30, null=True)
    isdefault = models.NullBooleanField(default=False)
    ishot = models.IntegerField(default=1)
    # user = models.ForeignKey(to=User, on_delete=models.CASCADE, db_column='address_user', related_name='address')
    uid = models.IntegerField()

    class Meta:
        db_table = 'address'


# 商品种类表
class Goods_Category(models.Model):
    id = models.AutoField(primary_key=True)  # 商品id
    gname = models.CharField(max_length=20, null=True)
    category = models.CharField(max_length=20, verbose_name='商品种类')  # 商品种类
    parentid = models.IntegerField( verbose_name='父id')  # 父id

    class Meta:
        db_table = 'goods_category'


# 商品信息表
class Goods_Info(models.Model):
    gid = models.AutoField(primary_key=True, verbose_name='商品信息表id')  # 商品信息表id
    classid = models.CharField(max_length=20, verbose_name='classid')  # classid
    gname = models.CharField(max_length=100, verbose_name='商品名字')  # 商品名字
    gnomber = models.CharField(max_length=100, verbose_name='编号')  # 编号
    gnet = models.CharField(max_length=30, verbose_name='净含量', null=True)  # 净含量
    gcases = models.CharField(max_length=30, verbose_name='箱重', null=True)  # 箱重
    gintegral = models.CharField(max_length=20, verbose_name='', default=0)  # 积分
    gbrand = models.CharField(max_length=20, verbose_name='积分', null=True)  # 品牌
    gplace = models.CharField(max_length=30, verbose_name='产地', null=True)  # 产地
    goutpic = models.CharField(max_length=100, verbose_name='封皮图片', null=True)  # 封皮图片(存地址)
    goldprice = models.CharField(max_length=20, verbose_name='旧价格', null=True)  # 旧价格
    gnewprice = models.CharField(max_length=20, verbose_name='新价格', null=True)  # 新价格
    ispromotion = models.NullBooleanField(default=False, verbose_name='促销')  # 是否促销 ，默认不热销（false）
    ishot = models.NullBooleanField(default=False, verbose_name='热卖')  # 是否热卖 ，默认不热销（false）
    sales = models.CharField(max_length=30, verbose_name='销量', default=1)  # 销量
    num = models.CharField(max_length=30, verbose_name='库存', default=1)  # 库存
    time = models.CharField(max_length=30, verbose_name='生产日期')  # 生产日期
    life = models.CharField(max_length=30, verbose_name='保质期')  # 保质期
    intro = models.CharField(max_length=30, verbose_name='简介', null=True)  # 简介
    storage = models.CharField(max_length=100, verbose_name='存储方法', null=True)  # 存储方法
    categoryid = models.CharField(max_length=20, verbose_name='种类id', null=True)  # '种类id

    class Meta:
        db_table = 'goods_info'


# 商品图片表
class Goods_Pic(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='goods', verbose_name='图片路径')
    gid = models.CharField(max_length=30)

    class Meta:
        db_table = 'goods_pic'


# 用户板块
class User_Category(models.Model):
    id = models.AutoField(primary_key=True)
    classname = models.CharField(max_length=30)
    parentid = models.IntegerField()
    isdel = models.IntegerField(default=0)

    class Meta:
        db_table = 'user_category'


# 用户收藏
class User_Collection(models.Model):
    id = models.AutoField(primary_key=True)
    kind = models.CharField(max_length=20)
    goods_status = models.IntegerField(default=0)
    # user = models.ForeignKey(to=User, on_delete=models.CASCADE, db_column='collection_user',
    #                          related_name='user_collection')
    # goodsinfo = models.ForeignKey(to=Goods_Info, on_delete=models.CASCADE, db_column='collection_goods',
    #                               related_name='user_collection')
    uid = models.IntegerField()
    gid = models.IntegerField()

    class Meta:
        db_table = 'user_collection'


# # 用户评论
# class User_review(models.Model):
#     id = models.AutoField(primary_key=True)
#     review_status = models.IntegerField(default=0)
#     comment = models.CharField(max_length=200, null=True)
#     user = models.ForeignKey(to=User, on_delete=models.CASCADE, db_column='review_user', related_name='user_review')
#     goodsinfo = models.ForeignKey(to=Goods_Info, on_delete=models.CASCADE, db_column='review_goods',
#                                   related_name='user_review')
#
#     class Meta:
#         db_table = 'user_review'


# 首页促销活动
class Home_Promotion(models.Model):
    id = models.AutoField(primary_key=True)
    picture = models.CharField(max_length=50)
    url = models.CharField(max_length=50)
    index = models.IntegerField(unique=True)

    class Meta:
        db_table = 'home_promotion'


# 首页分类商品展示表
class Home_Classification(models.Model):
    id = models.AutoField(primary_key=True)
    home_picture = models.CharField(max_length=50)
    parentid = models.IntegerField()
    index = models.IntegerField(unique=True)
    # goodsinfo = models.ForeignKey(to=Goods_Info, on_delete=models.CASCADE, db_column='classification_goods',
    #                               related_name='goods_classification')
    # goodscategory = models.ForeignKey(to=Goods_Category, on_delete=models.CASCADE, db_column='classification_category',
    #                                   related_name='category_classification')
    kindid = models.IntegerField()
    gid = models.IntegerField()
    cid = models.IntegerField()

    class Meta:
        db_table = 'home_classification'


# 订单信息表
class Order(models.Model):
    id = models.AutoField(primary_key=True)
    orderkind = models.CharField(max_length=60)
    pay = models.CharField(max_length=20)
    num = models.IntegerField(null=True)
    money = models.IntegerField(null=True)
    freight = models.IntegerField()
    status_type = ((1, '待支付'), ('2', '已支付'))
    usertype = models.IntegerField(default=1, choices=status_type)
    createtime = models.DateTimeField(auto_now=True)
    ordernumber = models.CharField(max_length=30, null=True)

    # user = models.ForeignKey(to=User, on_delete=models.CASCADE, db_column='order_user', related_name='user_order')
    # address = models.ForeignKey(to=Address, on_delete=models.CASCADE, db_column='order_address',
    #                             related_name='address_order')
    uid = models.IntegerField()
    aid = models.IntegerField()

    class Meta:
        db_table = 'order'


# 订单商品表
class Order_Commodity(models.Model):
    id = models.AutoField(primary_key=True)
    ordernumber = models.CharField(max_length=30)
    goodsnumber = models.IntegerField()
    goodsprice = models.IntegerField()
    discuss = models.CharField(max_length=300)
    # order = models.ForeignKey(to=Order, on_delete=models.CASCADE, db_column='commodity_order',
    #                           related_name='order_commodity')
    # goodsinfo = models.ForeignKey(to=Goods_Info, on_delete=models.CASCADE, db_column='commodity_goods',
    #                               related_name='goods_commodity')
    oid = models.IntegerField()
    gid = models.IntegerField()
    class Meta:
        db_table = 'order_commodity'


# 评论表
class Review(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.CharField(max_length=300, null=True)
    createtime = models.DateTimeField(auto_now=True)
    ordernumber = models.CharField(max_length=30)
    comment_level = models.IntegerField()
    logistics_lever = models.IntegerField()
    # user = models.ForeignKey(to=User, on_delete=models.CASCADE, db_column='review_user', related_name='user_review')
    # goodsinfo = models.ForeignKey(to=Goods_Info, on_delete=models.CASCADE, db_column='review_goods',
    #                               related_name='goods_review')
    uid = models.IntegerField()
    gid = models.IntegerField()

    class Meta:
        db_table = 'review'


# 评论图片
class Review_Picture(models.Model):
    id = models.AutoField(primary_key=True)
    picture = models.CharField(max_length=50)
    # review = models.ForeignKey(to=Review, on_delete=models.CASCADE, db_column='picture_rexiew',
    #                            related_name='review_picture')
    rid = models.IntegerField()

    class Meta:
        db_table = 'review_picture'

# 购物车
class Cart(models.Model):
    uid = models.CharField(max_length=20)
    gid = models.CharField(max_length=20)
    num = models.CharField(max_length=30)
    price = models.CharField(max_length=30)

    class Meta:
        db_table = 'cart'
