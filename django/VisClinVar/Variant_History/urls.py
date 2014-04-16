'''
Django Urls for Variant_History app in VisualizeClinVar project.

'''


from django.conf.urls import patterns, include, url

from Variant_History import views

urlpatterns = patterns('',
url(r'home', views.home, name='home'),
url(r'history', views.history, name='history'),
url(r'varType', views.varType, name='varType'),
url(r'varInterpret', views.varInterpret, name='varInterpret'),
)
