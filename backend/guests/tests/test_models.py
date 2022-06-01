from django.test import TestCase
from guests.models import Guest


class GuestsModelTest(TestCase):
    @classmethod
    def setUp(cls):
        """Setup test guest"""
        Guest.objects.create(
            firstname='Hans',
            lastname='Muster'
        )

    def test_string_method(self):
        """Method __str__ should be equal to field firstname"""
        guest = Guest.objects.get(firstname='Hans', lastname='Muster')
        expected_string = guest.firstname
        self.assertEqual(str(guest), expected_string)

    def test_firstname_max_length(self):
        """Title max_length should be 100"""
        guest = Guest.objects.get(firstname='Hans', lastname='Muster')
        max_length = guest._meta.get_field('firstname').max_length
        self.assertEqual(max_length, 100)
