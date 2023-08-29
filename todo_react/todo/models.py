import datetime
from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(max_length=500, blank=True)
    created = models.DateTimeField(default=datetime.datetime.now())
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    class Meta:
        ordering = ('created',)
