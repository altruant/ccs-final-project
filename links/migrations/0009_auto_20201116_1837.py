# Generated by Django 3.1.3 on 2020-11-16 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('links', '0008_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='comments',
            field=models.JSONField(default=0),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
