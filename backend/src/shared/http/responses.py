from rest_framework.response import Response
from rest_framework import status as http_status

def success_response(
    *,
    data=None,
    message: str = "Success",
    status_code: int = http_status.HTTP_200_OK,
):
    return Response(
        {
            "status": "success",
            "message": message,
            "data": data,
        },
        status=status_code,
    )


def error_response(
    *,
    message: str,
    status_code: int = http_status.HTTP_400_BAD_REQUEST,
):
    return Response(
        {
            "status": "error",
            "message": message,
        },
        status=status_code,
    )
