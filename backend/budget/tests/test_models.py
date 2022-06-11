from django.test import TestCase
from budget.models import Budget


class BudgetModelTest(TestCase):
    @classmethod
    def setUp(cls):
        """Setup test expense"""
        Budget.objects.create(
            title='Brautschuhe',
            budget='200'
        )

    def test_string_method(self):
        """Method __str__ should be equal to field title"""
        budget = Budget.objects.get(title='Brautschuhe', budget='200')
        expected_string = budget.title
        self.assertEqual(str(budget), expected_string)

    def test_title_max_length(self):
        """Title max_length should be 100"""
        budget = Budget.objects.get(title='Brautschuhe')
        max_length = budget._meta.get_field('title').max_length
        self.assertEqual(max_length, 100)
