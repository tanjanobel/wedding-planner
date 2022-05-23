from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    def to_internal_value(self, data):
        """Check if duedate is empty and convert to None"""
        if 'duedate' not in data.keys():
            data['duedate'] = None
        if data['duedate'] == '':
            data['duedate'] = None

        return super(TaskSerializer, self).to_internal_value(data)

    class Meta:
        model = Task
        fields = '__all__'
