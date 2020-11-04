from django.db import models
from django.conf import settings
# Create your models here.


class Link(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    title=models.CharField(max_length=255)
    youtube_url=models.URLField(max_length=255)
    pub_date=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class Comment(models.Model):
    link=models.ForeignKey(Link, on_delete=models.CASCADE)
    body=models.TextField()
    timestamp=models.TimeField(auto_now=False)

    def __str__(self):
        return self.body