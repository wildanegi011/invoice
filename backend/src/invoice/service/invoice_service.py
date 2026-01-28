
from venv import logger
from invoice.domain.invoice import Invoice
from invoice.domain.invoice_item import InvoiceItem
from invoice.dto.invoice_create_dto import InvoiceCreateDto
from invoice.dto.invoice_response_dto import InvoiceResponseDTO
from invoice.dto.invoice_update_dto import InvoiceUpdateDTO
from invoice.repository.interfaces import InvoiceRepository

class InvoiceService:
    def __init__(self, repository: InvoiceRepository):
        self.repository = repository
    
    def get_all(self) -> list[InvoiceResponseDTO]:
        return [
            InvoiceResponseDTO(
                id=invoice.invoice_id,
                invoice_number=invoice.invoice_number,
                subtotal=invoice.subtotal,
                tax=invoice.tax,
                total=invoice.total,
                items=[
                    {"name": item.name, "qty": item.qty, "rate": item.rate}
                    for item in invoice.items
                ],
            )
            for invoice in self.repository.list()
        ]
    

    def get_by_id(self, invoice_id: int) -> InvoiceResponseDTO:
        invoice = self.repository.get_by_id(invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")
        return InvoiceResponseDTO(
            id=invoice.invoice_id,
            invoice_number=invoice.invoice_number,
            subtotal=invoice.subtotal,
            tax=invoice.tax,
            total=invoice.total,
            items=[
                {"name": item.name, "qty": item.qty, "rate": item.rate}
                for item in invoice.items
            ],
        )
    
    def create_invoice(self, dto: InvoiceCreateDto) -> InvoiceResponseDTO:
        dto.validate()

        invoice = Invoice(
            invoice_id=None,
            invoice_number=dto.invoice_number,
            tax_rate=dto.tax_rate,
            items=[],
        )

        for item in dto.items:
            invoice.items.append(
                InvoiceItem(
                    name=item.name,
                    qty=item.qty,
                    rate=item.rate,
                )
            )

        self.repository.save(invoice)

        return InvoiceResponseDTO(
            id=invoice.invoice_id,
            invoice_number=invoice.invoice_number,
            subtotal=invoice.subtotal,
            tax=invoice.tax,
            total=invoice.total,
            items=[
                {"name": item.name, "qty": item.qty, "rate": item.rate}
                for item in invoice.items
            ],
        )

    def update_invoice(
        self,
        invoice_id: int,
        dto: InvoiceUpdateDTO,
    ) -> InvoiceResponseDTO:
        dto.validate()

        invoice = self.repository.get_by_id(invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")

        items = [
            InvoiceItem(
                name=item.name,
                rate=item.rate,
                qty=item.qty,
            )
            for item in dto.items
        ]

        invoice.update_items(items)

        self.repository.update(invoice_id, invoice)

        return InvoiceResponseDTO(
            id=invoice.invoice_id,
            invoice_number=invoice.invoice_number,
            subtotal=invoice.subtotal,
            tax=invoice.tax,
            total=invoice.total,
            items=[
                {"name": item.name, "qty": item.qty, "rate": item.rate}
                for item in invoice.items
            ],
        )

    def delete_invoice(self, invoice_id: int) -> None:
        invoice = self.repository.get_by_id(invoice_id)
        if not invoice:
            raise ValueError("Invoice not found")

        self.repository.delete(invoice_id)
