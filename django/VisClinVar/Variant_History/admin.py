'''
Django admin  for VisualizeClinVar project.
'''


from django.contrib import admin

from Variant_History.models import Dspclinva

admin.site.register(Dspclinva)