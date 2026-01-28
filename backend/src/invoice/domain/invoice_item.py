class InvoiceItem:
    def __init__(self, name: str, rate: float, qty: int):
        self.name = name
        self.rate = rate
        self.qty = qty

    @property
    def subtotal(self) -> float:
        return self.rate * self.qty

    def update(self, name: str, rate: float, qty: int):
        self.name = name
        self.rate = rate
        self.qty = qty

    def __repr__(self):
        return f"InvoiceItem(name={self.name}, rate={self.rate}, qty={self.qty})"
