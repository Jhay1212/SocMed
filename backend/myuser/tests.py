from django.test import TestCase
from .models import User


class TestUser(TestCase):

    def setUp(self):
        user1 = User.objects.create_user(username='username', email='email', password='passworASASASSd')
        user2 = User.objects.create_user(username='username2', email='email2', password='password2')

    
    def tearDown(self):
        User.objects.all().delete()

    def test_password(self):
        user = User.objects.get(username='username')
        self.assertTrue(user.check_password('passworASASASSd'))