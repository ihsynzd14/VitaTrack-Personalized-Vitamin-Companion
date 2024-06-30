from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("vitamin/", views.VitaminIntakeListCreate.as_view(), name="vitamin-list"),
    path("vitamin/<int:pk>/", views.VitaminIntakeDetail.as_view(), name="vitamin-listid"),
    path("vitamin/delete/<int:pk>/", views.VitaminIntakeDelete.as_view(), name="vitamin-note"),
]