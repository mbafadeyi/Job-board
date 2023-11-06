from rest_framework.serializers import ModelSerializer

from job_board.jobs.models import Job


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = (
            "id",
            "title",
            "user",
            "company_name",
            "company_website",
            "company_logo",
            "location",
            "remote",
            "salary",
            "available",
            "date_created",
            "sponsored",
        )
        read_only_fields = (
            "date_created",
            "user",
        )
