from .models import Link, Comment
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comment
        fields = ('timestamp', 'body')

class LinkSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    class Meta:
        model = Link
        fields = ('youtube_url', 'title', 'id', 'pub_date', 'comments')

    def create(self, validated_data):
        comments_data = validated_data.pop('comments')
        link_create = Link.objects.create(**validated_data)
        for comment in comments_data:
            Comment.objects.create(link=link_create, **comment)
        return link
