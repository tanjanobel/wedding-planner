# Generated by Django 4.0.3 on 2022-05-04 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='budget',
            field=models.DecimalField(decimal_places=2, max_digits=6, verbose_name='Budget'),
        ),
    ]
