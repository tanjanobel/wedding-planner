# Generated by Django 4.0.3 on 2022-05-21 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0008_alter_task_owner_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created',
            field=models.DateField(default='2022-05-21', verbose_name='Erstellt am'),
        ),
    ]
