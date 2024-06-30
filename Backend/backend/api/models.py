from django.db import models
from django.contrib.auth.models import User


class NoteVitamins(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
class VitaminIntake(models.Model):
    SUPPLEMENT_TYPES = [
        ('simple', 'Simple'),
        ('complex', 'Complex'),
    ]
    AMOUNT_MEASURES = [
        ('mg', 'mg'),
        ('gram', 'gram'),
        ('capsule', 'capsule'),
        ('ui', 'UI'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    supplement_type = models.CharField(max_length=7, choices=SUPPLEMENT_TYPES)
    supplement_name = models.CharField(max_length=100)
    nutritional_content = models.JSONField()
    amount = models.PositiveIntegerField()
    amount_measure = models.CharField(max_length=10, choices=AMOUNT_MEASURES)
    start_date = models.DateField()
    daily_intake_times = models.JSONField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.supplement_name} ({self.user.username})'
    
    