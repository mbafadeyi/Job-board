from rest_framework import generics

from job_board.jobs.models import Job

from .serializers import JobSerializer


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.all()
