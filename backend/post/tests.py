from django.test import TestCase
from .models import Post, Comments
from django.core.exceptions import ValidationError
from myuser.models import User
class PostTest(TestCase):
    def setUp(self):
        
        self.user = User.objects.create_user(username='username', email='email', password='password')
        self.post = Post.objects.create(title='title', content='content', media='media', user=self.user)
        self.post2 = Post.objects.create(title='title nigga', content='content nigger', media='media', user=self.user)
        self.comments = Comments.objects.create(user=self.user, post=self.post, content='content')

    def tearDown(self):
        Post.objects.all().delete()
        Comments.objects.all().delete()
        User.objects.all().delete()

    def test_post_create(self):
        self.assertEqual(self.post.title, 'title')
        self.assertEqual(self.post.content, 'content')
        self.assertEqual(self.post.media, 'media')
        self.assertEqual(self.post.user, self.user)

    def test_get_all_posts(self):
        posts = Post.objects.all()
        self.assertEqual(len(posts), 2)


    def get_all_comments_by_post(self):
        comments = Comments.objects.filter(post=self.post.id).all()
        self.assertEqual(len(comments), 1)


    def test_title_profanity(self):
        self.assertNotEqual(self.post2.title, 'title nigga')