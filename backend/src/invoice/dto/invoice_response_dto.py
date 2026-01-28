from dataclasses import asdict, dataclass, field
from typing import Optional, List, Dict, Any

@dataclass(frozen=True)
class InvoiceResponseDTO:
    id: int
    invoice_number: str
    subtotal: float
    tax: float
    total: float
    items: Optional[List[Dict[str, Any]]] = field(default_factory=list)

    def to_dict(self) -> dict:
        result = asdict(self)
        # Convert any InvoiceItem objects to dictionaries
        if 'items' in result and result['items']:
            result['items'] = [
                {
                    'name': item.name,
                    'qty': item.qty,
                    'rate': float(item.rate)  # Ensure rate is serializable
                }
                for item in self.items
            ]
        return result