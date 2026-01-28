from venv import logger

from django.db.models.base import transaction
from invoice.repository.interfaces import InvoiceRepository
from invoice.domain.invoice import Invoice
from invoice.domain.invoice_item import InvoiceItem
from invoice.infrastructure.models import InvoiceModel, InvoiceItemModel


class PostgresInvoiceRepository(InvoiceRepository):

    def save(self, invoice: Invoice) -> None:
        invoice_model = InvoiceModel.objects.create(
            invoice_number=invoice.invoice_number,
            tax_rate=invoice.tax_rate,
        )

        for item in invoice.items:
            InvoiceItemModel.objects.create(
                invoice=invoice_model,
                name=item.name,
                qty=item.qty,
                rate=item.rate,
            )
    
    def update(self, invoice_id: int, invoice: Invoice) -> None:
        invoice_model = InvoiceModel.objects.get(id=invoice_id)

        with transaction.atomic():
            invoice_model.tax_rate = invoice.tax_rate
            invoice_model.save()

            InvoiceItemModel.objects.filter(invoice=invoice_model).delete()

            InvoiceItemModel.objects.bulk_create([
                InvoiceItemModel(
                    invoice=invoice_model,
                    name=item.name,
                    qty=item.qty,
                    rate=item.rate,
                )
                for item in invoice.items
            ])

    def get_by_id(self, invoice_id: int) -> Invoice:
        model = (
            InvoiceModel.objects
            .prefetch_related("items")
            .get(id=invoice_id)
        )

        items = [
            InvoiceItem(
                name=item.name,
                qty=item.qty,
                rate=item.rate,
            )
            for item in model.items.all()
        ]

        invoice = Invoice(
            invoice_id=invoice_id,
            invoice_number=model.invoice_number,
            tax_rate=model.tax_rate,
            items=items,
        )

        return invoice

    def list(self) -> list[Invoice]:
        invoices = []
        for model in InvoiceModel.objects.prefetch_related("items").all():
            invoices.append(self.get_by_id(model.id))
        return invoices

    def delete(self, invoice_id: int) -> None:
        InvoiceModel.objects.filter(id=invoice_id).delete()
