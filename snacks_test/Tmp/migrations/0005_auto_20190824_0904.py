# Generated by Django 2.2 on 2019-08-24 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tmp', '0004_auto_20190823_2224'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goods_category',
            old_name='gid',
            new_name='id',
        ),
        migrations.AlterField(
            model_name='goods_category',
            name='gname',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
