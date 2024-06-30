from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserSerializer, NoteSerializer, VitaminIntakeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import NoteVitamins, VitaminIntake


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return NoteVitamins.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return NoteVitamins.objects.filter(author=user)


class VitaminIntakeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = VitaminIntake.objects.all()
    serializer_class = VitaminIntakeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
class VitaminIntakeListCreate(generics.ListCreateAPIView):
    serializer_class = VitaminIntakeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return VitaminIntake.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class VitaminIntakeDelete(generics.DestroyAPIView):
    serializer_class = VitaminIntakeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return VitaminIntake.objects.filter(user=user)
    

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]