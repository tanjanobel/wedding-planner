from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase


class APIViewTest(APITestCase):
    def test_registration(self):
        """User account should be generated"""
        data = {
            'email': 'admin@admin.ch',
            'first_name': 'Max',
            'last_name': 'Muster',
            'password': '12345678!',
            'password2': '12345678!'
        }
        response = self.client.post('/api/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        """User should be logged in"""
        data = {
            'email': 'admin@admin.ch',
            'first_name': 'Max',
            'last_name': 'Muster',
            'password': '12345678!',
            'password2': '12345678!'
        }
        response = self.client.post('/api/register/', data)

        data = {
            'email': 'admin@admin.ch',
            'password': '12345678!',
        }
        response = self.client.post('/api/token/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_route(self):
        """Guest should not be directed to tasks page"""
        response = self.client.get('/api/tasks')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

