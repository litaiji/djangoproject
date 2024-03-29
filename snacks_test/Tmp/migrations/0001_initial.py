# Generated by Django 2.2 on 2019-08-21 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('receive', models.CharField(max_length=30)),
                ('address', models.CharField(max_length=300)),
                ('telephone', models.CharField(max_length=13, null=True)),
                ('fixed_phone', models.CharField(max_length=20, null=True)),
                ('email', models.CharField(max_length=30, null=True)),
                ('isdefault', models.NullBooleanField(default=False)),
                ('uid', models.IntegerField()),
            ],
            options={
                'db_table': 'address',
            },
        ),
        migrations.CreateModel(
            name='Goods_Category',
            fields=[
                ('gid', models.AutoField(primary_key=True, serialize=False)),
                ('gname', models.CharField(max_length=20)),
                ('category', models.CharField(max_length=20, verbose_name='商品种类')),
                ('parentid', models.CharField(max_length=10, verbose_name='父id')),
            ],
            options={
                'db_table': 'goods_category',
            },
        ),
        migrations.CreateModel(
            name='Goods_Info',
            fields=[
                ('gid', models.AutoField(primary_key=True, serialize=False, verbose_name='商品信息表id')),
                ('classid', models.CharField(max_length=20, verbose_name='classid')),
                ('gname', models.CharField(max_length=100, verbose_name='商品名字')),
                ('gnomber', models.CharField(max_length=100, verbose_name='编号')),
                ('gnet', models.CharField(max_length=30, null=True, verbose_name='净含量')),
                ('gcases', models.CharField(max_length=30, null=True, verbose_name='箱重')),
                ('gintegral', models.CharField(default=0, max_length=20, verbose_name='')),
                ('gbrand', models.CharField(max_length=20, null=True, verbose_name='积分')),
                ('gplace', models.CharField(max_length=30, null=True, verbose_name='产地')),
                ('goutpic', models.CharField(max_length=100, null=True, verbose_name='封皮图片')),
                ('goldprice', models.CharField(max_length=20, null=True, verbose_name='旧价格')),
                ('gnewprice', models.CharField(max_length=20, null=True, verbose_name='新价格')),
                ('ispromotion', models.NullBooleanField(default=False, verbose_name='促销')),
                ('ishot', models.NullBooleanField(default=False, verbose_name='热卖')),
                ('sales', models.CharField(default=1, max_length=30, verbose_name='销量')),
                ('num', models.CharField(default=1, max_length=30, verbose_name='库存')),
                ('time', models.CharField(max_length=30, verbose_name='生产日期')),
                ('life', models.CharField(max_length=30, verbose_name='保质期')),
                ('intro', models.CharField(max_length=30, null=True, verbose_name='简介')),
                ('storage', models.CharField(max_length=100, null=True, verbose_name='存储方法')),
                ('categoryid', models.CharField(max_length=20, null=True, verbose_name='种类id')),
            ],
            options={
                'db_table': 'goods_info',
            },
        ),
        migrations.CreateModel(
            name='Goods_Pic',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='goods', verbose_name='图片路径')),
                ('gid', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'goods_pic',
            },
        ),
        migrations.CreateModel(
            name='Home_Classification',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('home_picture', models.CharField(max_length=50)),
                ('parentid', models.IntegerField()),
                ('index', models.IntegerField(unique=True)),
                ('kindid', models.IntegerField()),
                ('gid', models.IntegerField()),
                ('cid', models.IntegerField()),
            ],
            options={
                'db_table': 'home_classification',
            },
        ),
        migrations.CreateModel(
            name='Home_Promotion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('picture', models.CharField(max_length=50)),
                ('url', models.CharField(max_length=50)),
                ('index', models.IntegerField(unique=True)),
            ],
            options={
                'db_table': 'home_promotion',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('orderkind', models.CharField(max_length=60)),
                ('pay', models.CharField(max_length=20)),
                ('num', models.IntegerField(null=True)),
                ('money', models.IntegerField(null=True)),
                ('freight', models.IntegerField()),
                ('usertype', models.IntegerField(choices=[(1, '待支付'), ('2', '已支付')], default=1)),
                ('createtime', models.DateTimeField(auto_now=True)),
                ('uid', models.IntegerField()),
                ('aid', models.IntegerField()),
            ],
            options={
                'db_table': 'order',
            },
        ),
        migrations.CreateModel(
            name='Order_Commodity',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ordernumber', models.CharField(max_length=30)),
                ('goodsnumber', models.IntegerField()),
                ('goodsprice', models.IntegerField()),
                ('discuss', models.CharField(max_length=300)),
                ('oid', models.IntegerField()),
                ('gid', models.IntegerField()),
            ],
            options={
                'db_table': 'order_commodity',
            },
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('comment', models.CharField(max_length=300, null=True)),
                ('createtime', models.DateTimeField(auto_now=True)),
                ('ordernumber', models.CharField(max_length=30)),
                ('comment_level', models.IntegerField()),
                ('logistics_lever', models.IntegerField()),
                ('uid', models.IntegerField()),
                ('gid', models.IntegerField()),
            ],
            options={
                'db_table': 'review',
            },
        ),
        migrations.CreateModel(
            name='Review_Picture',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('picture', models.CharField(max_length=50)),
                ('rid', models.IntegerField()),
            ],
            options={
                'db_table': 'review_picture',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=30, null=True, unique=True)),
                ('telephone', models.CharField(max_length=13, null=True, unique=True)),
                ('password_hash', models.CharField(max_length=128)),
                ('isactivation', models.NullBooleanField(default=True)),
                ('usertype', models.IntegerField(choices=[(1, '管理员'), ('2', '普通用户')], default=2)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='User_Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('classname', models.CharField(max_length=30)),
                ('parentid', models.IntegerField()),
                ('isdel', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'user_category',
            },
        ),
        migrations.CreateModel(
            name='User_Collection',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('kind', models.CharField(max_length=20)),
                ('goods_status', models.IntegerField(default=0)),
                ('uid', models.IntegerField()),
                ('gid', models.IntegerField()),
            ],
            options={
                'db_table': 'user_collection',
            },
        ),
        migrations.CreateModel(
            name='User_Info',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=13)),
                ('realname', models.CharField(max_length=30)),
                ('sextype', models.IntegerField(choices=[(0, '女'), ('1', '男'), ('2', '保密')], default=2)),
                ('birthday', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=300)),
                ('qq', models.CharField(max_length=13, null=True)),
                ('home_phone', models.CharField(max_length=20, null=True)),
                ('office_phone', models.CharField(max_length=20, null=True)),
                ('msn', models.CharField(max_length=30, null=True)),
                ('email', models.CharField(max_length=30)),
                ('userid', models.IntegerField()),
            ],
            options={
                'db_table': 'user_info',
            },
        ),
    ]
