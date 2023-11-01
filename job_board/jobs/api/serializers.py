from rest_framework.serializers import ModelSerializer

from job_board.jobs.models import Job


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = (
            "title",
            "location",
            "remote",
            "salary",
            "date_created",
        )
