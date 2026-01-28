# invoice/handler/urls.py
from django.urls import path

from invoice.handler.views import InvoiceHandler

urlpatterns = [
    path("", InvoiceHandler.as_view(), name="invoice"),
    path("<int:invoice_id>/", InvoiceHandler.as_view(), name="invoice-by-id"),
]