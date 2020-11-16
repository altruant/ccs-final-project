# Generated by Django 3.1.3 on 2020-11-14 16:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('links', '0007_delete_comment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('timestamp', models.CharField(default='0', max_length=20)),
                ('parsedStamp', models.CharField(default='0s', max_length=20)),
                ('link', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='links.link')),
            ],
        ),
    ]
