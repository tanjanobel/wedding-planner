from rest_framework import serializers
from .models import Task, TaskStatus


class TaskSerializer(serializers.ModelSerializer):
    # def to_internal_value(self, data):
    #     # check for "duedate": "" and convert to None
    #     if data['duedate'] == '':
    #         data['duedate'] = None
    #     return super(TaskSerializer, self).to_internal_value(data)

    class Meta:
        model = Task
        fields = '__all__'


class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = ['__all__']
