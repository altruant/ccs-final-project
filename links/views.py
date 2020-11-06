from rest_framework import generics, permissions
from .models import *
from .serializers import *
from .permissions import *

class LinkListView(generics.ListCreateAPIView):
    queryset= Link.objects.all()
    serializer_class= LinkSerializer
    permissions_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LinkDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Link.objects.all()
    serializer_class= LinkSerializer
    permissions_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
