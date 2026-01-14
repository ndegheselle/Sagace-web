import { Client } from "@/lib/api/clients";
import settings from "@/lib/api/settings";
import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { EstimateDTO, EstimateStatus } from "@sagace/common/DTOs/documents/estimate";

export class Estimate extends EstimateDTO {
    client?: Client;

    constructor(data: any = {}) {
        super(data);
        this.client = new Client(data.client); 
    }
}

class EstimateApi extends ApiCrud<Estimate> {
    constructor() {
        super(Estimate, settings.apiUrl + '/documents/estimates');
    }

    async toInvoice(estimateId: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}/${estimateId}/to-invoice`, {
            method: "POST",
            headers: this.headers,
        });

        if (!response.ok)
            throw new Error(`Failed to convert estimate with id ${estimateId} to invoice`);
        const json = await response.json();
        return json.id;
    }
}

export { EstimateStatus };
export const api = new EstimateApi();