from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import RegisterView, LoginView, UserView, LogoutView, AdminLoginView, ProfileUpdateView, UserListView, UserSearchView, UserDeleteView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('admin_login', AdminLoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('updateImage/<id>', ProfileUpdateView.as_view()),
    path('users', UserListView.as_view()),
    path('search',UserSearchView.as_view()),
    path('delete_user',UserDeleteView.as_view())
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)