import settings from "@/lib/api/settings";
import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { InvoiceDTO, InvoiceStatus } from "sagace-common/DTOs/documents/invoice";

export class Invoice extends InvoiceDTO {
}
export { InvoiceStatus };

export const api = new ApiCrud(Invoice, settings.apiUrl + '/documents/invoices');