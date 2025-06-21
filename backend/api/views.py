from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from community.models import Community
from .serializers import (PostSerializer, 
                          UserSerializer, 
                          RegisterSerializer,
                           CommentSerializer,
                           CommunitySerializer,
                            CustomTokenObtainPairSerializer)
from django_filters import rest_framework as filters


from .filters import PostFilter, UserFilter, CommuntyFilter
from post.models import Post, Comments
from myuser.models import User

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
    filter_backends = (filters.DjangoFilterBackend, )
    filter_class = UserFilter
    filterset_fields = ['username', 'email']

    def retrieve(self, request, *args, **kwargs):
        username =  kwargs.get('username')
        try:
            user=  User.objects.get(username=username).first()
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except:
            return Response({"error": "User s    not found"}, status=status.HTTP_404_NOT_FOUND)

    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username')
        if username:
            queryset = queryset.filter(username__iexact=username)
        return queryset
  
    
    
class PostViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Post.objects.all().order_by('?')
    serializer_class = PostSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = PostFilter

    def dispatch(self, request, *args, **kwargs):
        print(self, request, *args, **kwargs)
        print('dispatching')
        return super().dispatch(request, *args, **kwargs)


    def create(self, request, *args, **kwargs):
        permission_classes = [IsAuthenticated]
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        return Response
    
    

class CommentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer

    class Meta:
        model = Comments
        fields = ['id', 'content', 'date_created', 'date_updated', 'user', 'post']

    def perform_create(self, serializer):
        if self.request.user.is_authenticated():
            serializer.save(user=self.request.user)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            refresh = RefreshToken.for_user(user=user)
            return Response(
                
                {'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    
                },
               ' refresh': str(refresh.access_token),
                'token': str(refresh)}
            )
        return Response({'error': 'Invalid data'})      
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        pass

    
class CommunityViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = CommuntyFilter

    

    class Meta:
        model = Community
        fields = ['id', 'name', 'description', 'logo', 'users', 'post']

    def get_queryset(self):
        queryset = Community.objects.all()
        name = self.request.query_params.get('name')
        print(name)

        if self.request.user.is_authenticated:
            return queryset.filter(users=self.request.user)

        if name:
            filtered = queryset.filter(name__iexact=name)
            if filtered.exists():
                return filtered

        return queryset

    