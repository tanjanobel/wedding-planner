# Generated by Django 4.0.3 on 2022-05-21 13:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_remove_userprofile_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='best_man',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='Trauzeuge'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='bride',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='Braut'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='groom',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='Bräutigam'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='maid_of_honor',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='Trauzeugin'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='wedding_budget',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=8, verbose_name='Hochzeitsbudget'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='wedding_city',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='Hochzeitsort'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='wedding_date',
            field=models.DateField(blank=True, default=datetime.date.today, verbose_name='Hochzeitsdatum'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='email',
            field=models.EmailField(max_length=255, unique=True, verbose_name='E-Mail Adresse'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='first_name',
            field=models.CharField(max_length=255, verbose_name='Vorname'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='last_name',
            field=models.CharField(max_length=255, verbose_name='Nachname'),
        ),
    ]
