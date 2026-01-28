from invoice.domain.invoice_item import InvoiceItem


class Invoice:
    def __init__(self, invoice_id: int, invoice_number: str, tax_rate: float, items: list[InvoiceItem]):
        self.invoice_id = invoice_id
        self.invoice_number = invoice_number
        self.tax_rate = tax_rate
        self.items = items
        self.subtotal = 0
        self.tax = 0
        self.total = 0

        self.recalculate()

    def update_items(self, items: list[InvoiceItem]):
        self.items = items
        self.recalculate()

    def recalculate(self):
        self.subtotal = sum(item.subtotal for item in self.items)
        self.tax = self.subtotal * self.tax_rate
        self.total = self.subtotal + self.tax
    
    def __repr__(self):
        return f"Invoice(invoice_id={self.invoice_id}, invoice_number={self.invoice_number}, tax_rate={self.tax_rate}, items={self.items})"