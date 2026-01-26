import { ApiCrud } from "@/base/api/ApiCrud";
import { Client } from "@/data/clients";
import { EstimateDTO, EstimateStatus } from '@sagace/common';

export class Estimate extends EstimateDTO {
    client?: Client;

    constructor(data: any = {}) {
        super(data);
        this.client = new Client(data.client);
    }
}

class EstimateApi extends ApiCrud<Estimate> {
    constructor() {
        super(Estimate, import.meta.env.VITE_API_URL + '/documents/estimates');
    }

    async toInvoice(estimateId: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}/${estimateId}/to-invoice`, {
            method: "POST",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok)
            throw new Error(`Failed to convert estimate with id ${estimateId} to invoice`);
        const json = await response.json();
        return json.id;
    }

    async countDraft(): Promise<number> {
        const response = await fetch(`${this.baseUrl}/count/draft`, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Failed to fetch draft estimates count");

        const json = await response.json();
        return json.count;
    }

    async countSent(): Promise<number> {
        const response = await fetch(`${this.baseUrl}/count/sent`, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Failed to fetch sent estimates count");

        const json = await response.json();
        return json.count;
    }
}

export { EstimateStatus };
export const api = new EstimateApi();