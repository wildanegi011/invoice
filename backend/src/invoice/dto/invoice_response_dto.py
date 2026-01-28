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
        # Convert any InvoiceItem objects to dictionaries if they aren't already
        if 'items' in result and result['items']:
            items_list = []
            for item in self.items:
                if hasattr(item, 'name'):
                    # It's an object
                    items_list.append({
                        'name': item.name,
                        'qty': item.qty,
                        'rate': float(item.rate)
                    })
                else:
                    # It's likely already a dict
                    items_list.append(item)
            result['items'] = items_list
        return result