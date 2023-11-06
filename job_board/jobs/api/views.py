import stripe
from django.conf import settings
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from job_board.jobs.models import Job

from .serializers import JobSerializer

# This is a public sample test API key.
stripe.api_key = settings.STRIPE_SECRET_KEY


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Job.objects.filter(available=True)


class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = (IsAuthenticated,)

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


class CreatePaymentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                amount=1000,  # 10 cents
                currency="usd",
                # In the latest version of the API, specifying the
                #  `automatic_payment_methods` parameter is optional
                # because Stripe enables its functionality by default.
                automatic_payment_methods={
                    "enabled": True,
                },
            )
            return Response({"clientSecret": intent["client_secret"]})
        except Exception as e:
            return Response({"error": str(e)}, status=403)
