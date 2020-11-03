from rest_framework import generics, permissions
from .models import *
from .serializers import *


class LinkListView(generics.ListCreateAPIView):
    queryset= Link.objects.all()
    serializer_class= LinkSerializer

class LinkDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Link.objects.all()
    serializer_class= LinkSerializer
