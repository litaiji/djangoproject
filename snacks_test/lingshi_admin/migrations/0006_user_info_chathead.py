# Generated by Django 2.0 on 2019-08-23 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lingshi_admin', '0005_user_isdel'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_info',
            name='chathead',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
