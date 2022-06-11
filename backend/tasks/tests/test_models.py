from django.test import TestCase
from tasks.models import Task


class TasksModelTest(TestCase):
    @classmethod
    def setUp(cls):
        """Setup test task"""
        Task.objects.create(
            title='Gastgeschenke basteln',
        )

    def test_string_method(self):
        """Method __str__ should be equal to field title"""
        task = Task.objects.get(title='Gastgeschenke basteln')
        expected_string = task.title
        self.assertEqual(str(task), expected_string)

    def test_title_max_length(self):
        """Title max_length should be 100"""
        task = Task.objects.get(title='Gastgeschenke basteln')
        max_length = task._meta.get_field('title').max_length
        self.assertEqual(max_length, 100)
