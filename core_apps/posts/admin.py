from typing import Any
from django.contrib import admin
from django.db.models.query import QuerySet
from django.http import HttpRequest
from .models import Post
from django.contrib.contenttypes.models import ContentType
from core_apps.common.admin import ContentViewInline
from core_apps.common.models import ContentView


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["title", "tag_list", "get_total_views"]
    inlines = [ContentViewInline]

    def get_total_views(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return ContentView.objects.filter(
            content_type=content_type, object_id=obj.pkid
        ).count()

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related("tags")

    def tag_list(self, obj):
        return ", ".join(o.name for o in obj.tags.all())