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


from post.models import Post, Comments
from myuser.models import User

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

  
    
    
class PostViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer



    def perform_create(self, serializer):
        if self.request.user.is_authenticated():
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