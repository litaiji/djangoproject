# Generated by Django 2.2 on 2019-08-24 10:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tmp', '0006_auto_20190824_0957'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='ordernumber',
        ),
        migrations.RemoveField(
            model_name='order_commodity',
            name='ordernumber',
        ),
        migrations.RemoveField(
            model_name='review',
            name='ordernumber',
        ),
    ]