import { Client } from "@/lib/api/clients";
import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { InvoiceDTO, InvoiceStatus } from "@sagace/common/DTOs/documents/invoice";

export class Invoice extends InvoiceDTO {
    client?: Client = undefined;
    constructor(data: any = {}) {
        super(data);
        this.client = new Client(data.client); 
    }
}
export { InvoiceStatus };

export const api = new ApiCrud(Invoice, import.meta.env.VITE_API_URL + '/documents/invoices');