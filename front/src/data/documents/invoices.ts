import { Client } from "@/data/clients";
import { ApiCrud } from "@/base/api/ApiCrud";
import { InvoiceDTO, InvoiceStatus } from '@sagace/common';

export class Invoice extends InvoiceDTO {
    client?: Client = undefined;
    constructor(data: any = {}) {
        super(data);
        this.client = new Client(data.client); 
    }
}
export { InvoiceStatus };

export const api = new ApiCrud(Invoice, import.meta.env.VITE_API_URL + '/documents/invoices');