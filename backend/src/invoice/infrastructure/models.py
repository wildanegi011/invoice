from django.db import models


class InvoiceModel(models.Model):
    invoice_number = models.CharField(max_length=50)
    tax_rate = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = "invoice"

class InvoiceItemModel(models.Model):
    invoice = models.ForeignKey(
        InvoiceModel,
        related_name="items",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=255)
    qty = models.IntegerField()
    rate = models.FloatField()

    class Meta:
        app_label = "invoice"