# Generated by Django 4.0.3 on 2022-03-05 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Offen', 'Offen'), ('In Arbeit', 'In Arbeit'), ('Erledigt', 'Erledigt')], default='Offen', max_length=32, verbose_name='Status')),
                ('title', models.CharField(max_length=100, verbose_name='Titel')),
                ('description', models.TextField(blank=True, verbose_name='Notizen')),
                ('due_date', models.DateField(default='Kein Enddatum', verbose_name='Fällig am')),
                ('budget', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, verbose_name='Budget')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('created', models.DateField(default='2022-03-05', verbose_name='Erstellt am')),
                ('changed', models.DateTimeField(auto_now=True, verbose_name='Geändert am')),
            ],
            options={
                'verbose_name': 'Aufgabe',
                'verbose_name_plural': 'Aufgaben',
                'ordering': ['due_date'],
            },
        ),
    ]
