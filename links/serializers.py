from .models import Link
from rest_framework import serializers

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model= Comment
#         fields = ('id', 'timestamp', 'body', 'parsedStamp')

class LinkSerializer(serializers.ModelSerializer):
    # comments = CommentSerializer(many=True)
    username=serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Link
        fields = ('youtube_url', 'youtube_ID', 'username', 'title', 'id', 'pub_date', 'comments')

    # def create(self, validated_data):
    #     comments_data = validated_data.pop('comments')
    #     link = Link.objects.create(**validated_data)
    #     for comment in comments_data:
    #         Comment.objects.create(link=link, **comment)
    #     return link
    #
    # def update(self, instance, validated_data):
    #     # import pdb; pdb.set_trace()
    #
    #     comments = validated_data.get('comments')
    #     for item in comments:
    #         # if there is an id need to Update
    #         if item.get('id') == True :
    #             instance.id = item.get('id')
    #             instance.timestamp = item.get('timestamp')
    #             instance.body = item.get('body')
    #             instance.parsedStamp = item.get('parsedStamp')
    #         # else create one
    #         else :
    #             Comment.objects.create(**item)
    #
    #     instance.save()
    #     return instance
