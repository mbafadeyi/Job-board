from rest_framework.permissions import BasePermission


class IsJobOwner(BasePermission):
    """
    Allos acess only to authenticated users.
    """

    def has_object_permission(self, request, view, obj):
        job = obj
        return job.user == request.user
