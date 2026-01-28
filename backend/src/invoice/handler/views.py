
from rest_framework.views import APIView
from rest_framework import status

from invoice.dto.invoice_create_dto import InvoiceCreateDto
from invoice.dto.invoice_item_dto import InvoiceItemDTO
from invoice.dto.invoice_update_dto import InvoiceUpdateDTO
from invoice.repository.postgres_repository import PostgresInvoiceRepository
from invoice.service.invoice_service import InvoiceService
from shared.http.responses import success_response


class InvoiceHandler(APIView):
    def get(self, request, invoice_id=None):
        service = InvoiceService(
            repository=PostgresInvoiceRepository()
        )

        if invoice_id is not None:
            invoice = service.get_by_id(invoice_id)

            return success_response(
                message="Invoice detail",
                data=invoice.to_dict(),
                status_code=status.HTTP_200_OK,
            )

        invoices = service.get_all()

        return success_response(
            message="Invoice list",
            data=[invoice.to_dict() for invoice in invoices],
            status_code=status.HTTP_200_OK,
        )

    def post(self, request):
        service = InvoiceService(
            repository=PostgresInvoiceRepository()
        )

        items = [
        InvoiceItemDTO(
            name=i["name"],
            qty=i["qty"],
            rate=i["rate"],
        )
        for i in request.data.get("items", [])
        ]


        dto = InvoiceCreateDto(
            invoice_number=request.data["invoice_number"],
            tax_rate=request.data.get("tax_rate", 0),
            items=items,
        )

        invoice = service.create_invoice(dto)

        return success_response(
            message="Invoice created successfully",
            data=invoice.__dict__,
            status_code=status.HTTP_201_CREATED,
        )

    def put(self, request, invoice_id):
        items = [
            InvoiceItemDTO(
                name=item["name"],
                rate=item["rate"],
                qty=item["qty"],
            )
            for item in request.data.get("items", [])
        ]

        dto = InvoiceUpdateDTO(
            tax_rate=request.data.get("tax_rate"),
            items=items,
        )

        service = InvoiceService(
            repository=PostgresInvoiceRepository()
        )

        invoice = service.update_invoice(invoice_id, dto)

        return success_response(
            message="Invoice updated successfully",
            data=invoice.to_dict(),
            status_code=status.HTTP_200_OK,
        )

    def delete(self, request, invoice_id):
        service = InvoiceService(
            repository=PostgresInvoiceRepository()
        )

        service.delete_invoice(invoice_id)

        return success_response(
            message="Invoice deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT,
        )