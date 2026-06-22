from django.db import models

class Artwork(models.Model):
    descricao = models.CharField(max_length=255)
    img = models.URLField(max_length=500)
    tipoArt = models.CharField(max_length=100)
    privado = models.BooleanField(default=False)

    def __str__(self):
        return self.descricao