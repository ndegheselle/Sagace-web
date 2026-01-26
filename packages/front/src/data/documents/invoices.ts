import { ApiCrud } from "@/base/api/ApiCrud";
import { Client } from "@/data/clients";
import { InvoiceDTO, InvoiceStatus } from '@sagace/common';

export class Invoice extends InvoiceDTO {
    client?: Client = undefined;
    constructor(data: any = {}) {
        super(data);
        this.client = new Client(data.client);
    }
}
export { InvoiceStatus };

class InvoiceApi extends ApiCrud<Invoice> {
    constructor() {
        super(Invoice, import.meta.env.VITE_API_URL + '/documents/invoices');
    }

    async countIssued(): Promise<number> {
        const response = await fetch(`${this.baseUrl}/count/issued`, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Failed to fetch issued invoices count");

        const json = await response.json();
        return json.count;
    }

    async countOverdue(): Promise<number> {
        const response = await fetch(`${this.baseUrl}/count/overdue`, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Failed to fetch overdue invoices count");

        const json = await response.json();
        return json.count;
    }

}

export const api = new InvoiceApi();