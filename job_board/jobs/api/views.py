from rest_framework import generics

from job_board.jobs.models import Job

from .serializers import JobSerializer


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer


class JobUpdateView(generics.UpdateAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(available=True)
