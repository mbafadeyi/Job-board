from rest_framework import generics
from rest_framework.permissions import AllowAny

from job_board.jobs.models import Job

from .serializers import JobSerializer


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobDetailView(generics.RetrieveAPIView):
    serializer_class = JobSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Job.objects.all()


class JobUpdateView(generics.UpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobDeleteView(generics.DestroyAPIView):
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Job.objects.all()
