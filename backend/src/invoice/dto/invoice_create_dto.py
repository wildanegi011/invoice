from dataclasses import dataclass

from invoice.dto.invoice_item_dto import InvoiceItemDTO

@dataclass(frozen=True)
class InvoiceCreateDto:
    invoice_number: str
    tax_rate: float
    items: list[InvoiceItemDTO]

    def validate(self) -> None:
        if not self.invoice_number:
            raise ValueError("invoice_number is required")

        if self.tax_rate < 0:
            raise ValueError("tax_rate must be >= 0")

        if not self.items:
            raise ValueError("invoice must have at least one item")

        for item in self.items:
            item.validate()