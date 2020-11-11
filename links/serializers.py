from .models import Link, Comment
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comment
        fields = ('timestamp', 'body', 'parsedStamp')

class LinkSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)

    class Meta:
        model = Link
        fields = ('youtube_url', 'youtube_ID', 'user', 'title', 'id', 'pub_date', 'comments')

    def create(self, validated_data):
        comments_data = validated_data.pop('comments')
        link = Link.objects.create(**validated_data)
        for comment in comments_data:
            Comment.objects.create(link=link, **comment)
        return link
