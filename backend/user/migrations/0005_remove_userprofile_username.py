# Generated by Django 4.0.3 on 2022-05-20 09:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_userprofile_email_alter_userprofile_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='username',
        ),
    ]