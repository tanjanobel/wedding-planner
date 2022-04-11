# Generated by Django 4.0.3 on 2022-04-11 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Guest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Ausstehend', 'Ausstehend'), ('Zusage', 'Zusage'), ('Absage', 'Absage')], default='Ausstehend', max_length=32, verbose_name='Status')),
                ('firstname', models.CharField(max_length=100, verbose_name='Vorname')),
                ('lastname', models.CharField(max_length=100, verbose_name='Nachname')),
                ('street', models.CharField(blank=True, max_length=100, verbose_name='Strasse')),
                ('zip', models.CharField(blank=True, max_length=4, verbose_name='PLZ')),
                ('city', models.CharField(blank=True, max_length=100, verbose_name='Ort')),
                ('email', models.EmailField(blank=True, max_length=100, verbose_name='E-Mail Adresse')),
                ('phone', models.CharField(blank=True, max_length=10)),
                ('description', models.TextField(blank=True, verbose_name='Notizen')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('created', models.DateField(default='2022-04-11', verbose_name='Erstellt am')),
                ('changed', models.DateTimeField(auto_now=True, verbose_name='Geändert am')),
            ],
            options={
                'verbose_name': 'Gast',
                'verbose_name_plural': 'Gäste',
            },
        ),
    ]
