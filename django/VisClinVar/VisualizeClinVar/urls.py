'''
Django URLS
'''
from django.conf.urls import patterns, include, url
from Variant_History.views import home
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
url(r'^Variant_History/', include('Variant_History.urls')),
url(r'^admin/', include(admin.site.urls)),
)
