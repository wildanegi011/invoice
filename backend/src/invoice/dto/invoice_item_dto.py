from dataclasses import dataclass


@dataclass(frozen=True)
class InvoiceItemDTO:
    name: str
    rate: float
    qty: int

    def validate(self):
        if not self.name:
            raise ValueError("item name is required")
        if self.rate <= 0:
            raise ValueError("rate must be > 0")
        if self.qty <= 0:
            raise ValueError("qty must be > 0")
