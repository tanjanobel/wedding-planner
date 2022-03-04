from django.db import models


class Task(models.Model):
    title = models.CharField(
        verbose_name='Title',
        max_length=100,
    )
    date = models.DateField(
        auto_now_add=True
    )
