# Generated by Django 3.2.5 on 2022-04-27 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guests', '0003_alter_guest_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guest',
            name='created',
            field=models.DateField(default='2022-04-27', verbose_name='Erstellt am'),
        ),
    ]