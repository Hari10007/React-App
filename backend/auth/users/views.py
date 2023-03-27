from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, AllUserSerializer
from .models import User
from django.db.models import Q
from django.http import HttpResponse
from django.http import JsonResponse
import jwt, datetime

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email, is_staff = False).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'admin': user.is_staff,
            'image': user.image and "http://localhost:8000/api"+ user.image.url  or "",
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }


        token = jwt.encode(payload, 'secret', algorithm='HS256').encode().decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

class AdminLoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email , is_staff = True).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        payload = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'admin': user.is_staff,
            'image': user.image and "http://localhost:8000/api"+ user.image.url  or "",
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }


        token = jwt.encode(payload, 'secret', algorithm='HS256').encode().decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


class ProfileUpdateView(APIView):
    def patch(self, request ,id):
        user = get_object_or_404(User, id=id)
        # username = request.POST.get('username')
        # email = request.POST.get('email')
        image = request.FILES.get('image')
        # user.username = username
        # user.email = email
        if image:
            user.image = image
        user.save()
        return Response({"id":user.id, "image": "http://localhost:8000/api"+user.image.url})


class UserListView(APIView):
    def get(self, request):
        queryset = User.objects.filter(is_staff = False).all()
        serialized = AllUserSerializer(queryset, many=True)

        return Response(serialized.data)


class UserSearchView(APIView):
    def get(self, request):
        keyword = request.GET.get('query')
        users = User.objects.filter(Q(username__icontains = keyword) | Q(email__icontains = keyword) , is_staff = False)
        serialized = AllUserSerializer(users, many=True)
        return Response(serialized.data)

class UserDeleteView(APIView):
    def delete(self, request):
        id = request.data['user']
        user = get_object_or_404(User, id=id)
        user.delete()
        response = Response()
        response.data = {
            'message': 'success'
        }
        return response