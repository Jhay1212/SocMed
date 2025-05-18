from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from post.models import Post, Comments
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
                            CustomTokenObtainPairSerializer)
# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class PostViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'likes', 'dislike', 'media', 'date_created', 'date_updated', 'user']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Comments.objects.all()
    serializer_class = UserSerializer

    class Meta:
        model = Comments
        fields = ['id', 'content', 'date_created', 'date_updated', 'user', 'post']


class LoginAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)
    
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            refresh = RefreshToken.for_user(
                {'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                },
               ' refresh': str(refresh.access_token),
                'token': str(refresh)}
            )
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
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
            

class CommunityViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer