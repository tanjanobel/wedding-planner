from django.test import TestCase
from user.models import UserProfile


class UserModelTest(TestCase):
    @classmethod
    def setUp(cls):
        """Setup test user"""
        UserProfile.objects.create(
            email='hans@muster.ch',
            first_name='Hans',
            last_name='Muster'
        )

    def test_string_method(self):
        """Method __str__ should be equal to field title"""
        user = UserProfile.objects.get(email='hans@muster.ch', first_name='Hans', last_name='Muster')
        expected_string = user.email
        self.assertEqual(str(user), expected_string)

    def test_firstname_max_length(self):
        """E-Mail max_length should be 255"""
        user = UserProfile.objects.get(email='hans@muster.ch', first_name='Hans', last_name='Muster')
        max_length = user._meta.get_field('email').max_length
        self.assertEqual(max_length, 255)
