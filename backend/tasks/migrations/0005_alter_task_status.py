# Generated by Django 4.0.3 on 2022-04-07 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_alter_task_created_alter_task_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('OFFEN', 'Offen'), ('IN_ARBEIT', 'In Arbeit'), ('ERLEDIGT', 'Erledigt')], default='OFFEN', max_length=32, verbose_name='Status'),
        ),
    ]