# Generated by Django 4.0.3 on 2022-05-04 15:04

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('status', models.CharField(choices=[('Offen', 'Offen'), ('Bezahlt', 'Bezahlt')], default='Offen', max_length=32, verbose_name='Status')),
                ('title', models.CharField(max_length=100, verbose_name='Titel')),
                ('description', models.TextField(blank=True, max_length=500, verbose_name='Notizen')),
                ('budget', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, verbose_name='Budget')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('created', models.DateField(default='2022-05-04', verbose_name='Erstellt am')),
                ('changed', models.DateTimeField(auto_now=True, verbose_name='Geändert am')),
            ],
            options={
                'verbose_name': 'Ausgabe',
                'verbose_name_plural': 'Ausgaben',
            },
        ),
    ]