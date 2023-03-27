from django.contrib import admin
from django.contrib.auth.admin import UserAdmin  as BaseUserAdmin
from .models import User
# Register your models here.

class AccountAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'username','date_joined')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    add_fieldsets = (
        (None, {
            'fields': ('email', 'password1', 'password2')
        }),
        ('Personal info', {
            'fields': ('username')
        })
    )

admin.site.register(User, AccountAdmin)