# Generated by Django 4.0.4 on 2022-05-24 06:58

from django.db import migrations, models
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0009_alter_task_created'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': [django.db.models.expressions.OrderBy(django.db.models.expressions.F('duedate'), nulls_last=True)], 'verbose_name': 'Aufgabe', 'verbose_name_plural': 'Aufgaben'},
        ),
        migrations.RemoveField(
            model_name='task',
            name='budget',
        ),
        migrations.AlterField(
            model_name='task',
            name='created',
            field=models.DateField(default='2022-05-24', verbose_name='Erstellt am'),
        ),
    ]