from rest_framework import generics, permissions
from .models import *
from .serializers import *
from .permissions import *

class LinkListView(generics.ListCreateAPIView):
    serializer_class= LinkSerializer
    permissions_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user=self.request.user
        return Link.objects.filter(user=user)

# class CommentCreateView(generics.ListCreateAPIView):
#     serializer_class= CommentSerializer
#     permissions_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
#     queryset= Comment.objects.all()
#
# class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class= CommentSerializer
#     permissions_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
#     queryset= Comment.objects.all()

class LinkDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Link.objects.all()
    serializer_class= LinkSerializer
    permissions_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
