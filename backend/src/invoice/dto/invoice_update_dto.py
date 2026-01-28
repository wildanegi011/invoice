from dataclasses import dataclass
from typing import List
from invoice.dto.invoice_item_dto import InvoiceItemDTO


@dataclass(frozen=True)
class InvoiceUpdateDTO:
    tax_rate: float
    items: List[InvoiceItemDTO]

    def validate(self):
        if self.tax_rate < 0:
            raise ValueError("tax_rate must be >= 0")
        if not self.items:
            raise ValueError("invoice must have items")
        for item in self.items:
            item.validate()
