from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter

from job_board.jobs.api import views
from job_board.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)


app_name = "api"

urlpatterns = [
    path("jobs/", views.JobListView.as_view()),
    path("jobs/<pk>/", views.JobDetailView.as_view()),
    path("jobs/<pk>/update/", views.JobUpdateView.as_view()),
    path("jobs/<pk>/delete/", views.JobDeleteView.as_view()),
    path("create-job/", views.JobCreateView.as_view()),
    path("payments/create-payment/", views.CreatePaymentView.as_view()),
]

urlpatterns += router.urls
