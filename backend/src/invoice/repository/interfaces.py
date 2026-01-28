from abc import ABC, abstractmethod
from invoice.domain.invoice import Invoice


class InvoiceRepository(ABC):

    @abstractmethod
    def save(self, invoice: Invoice) -> None:
        pass

    @abstractmethod
    def update(self, invoice_id: int, invoice: Invoice) -> None:
        pass

    @abstractmethod
    def get_by_id(self, invoice_id: int) -> Invoice:
        pass

    @abstractmethod
    def list(self) -> list[Invoice]:
        pass

    @abstractmethod
    def delete(self, invoice_id: int) -> None:
        pass
