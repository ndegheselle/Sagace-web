import { FakeApiCrud } from "@/lib/base/FakeApiCrud";

import { fakeArticles } from "@/lib/api/billable/article/article.fake";
import { fakeServices } from "@/lib/api/billable/service/service.fake";
import { fakeClients } from "@/lib/api/client/client.fake";

import { Estimate, EnumEstimateStatus } from './estimate.model';
import { api as invoiceApi } from "@/lib/api/document/invoice";
import { InvoiceFactory } from "@/lib/api/document/invoice/invoice.fake";

let estimateCounter = 1;

function createRandomString(length: number, chars: string): string {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function createRandomRef(): string {
    return `${createRandomString(3, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")}-${createRandomString(6, "0123456789")}`;
}

function createFakeEstimate(overrides: Partial<Estimate> = {}): Estimate {
    const estimate = new Estimate();
    const now = new Date();

    const id = overrides.id ?? `estimate-${estimateCounter++}`;
    const client = overrides.client ?? fakeClients[estimateCounter % fakeClients.length];
    const reference = overrides.reference ?? createRandomRef();
    const notes = overrides.notes ?? `Notes for ${reference}`;
    const status = overrides.status ?? EnumEstimateStatus.Draft;

    Object.assign(estimate, {
        id,
        reference,
        client,
        notes,
        status,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now
    });

    // Articles
    estimate.addItem(fakeArticles[0]!, 2);
    estimate.addItem(fakeArticles[1]!, 1);

    // Services
    estimate.addItem(fakeServices[0]!, 10); // 10 hours
    estimate.addItem(fakeServices[1]!, 5);  // 5 hours

    return estimate;
}


// Create multiple fake estimates
const fakeEstimates = [
    createFakeEstimate({}),
    createFakeEstimate({}),
    createFakeEstimate({ status: EnumEstimateStatus.Sent }),
    createFakeEstimate({ status: EnumEstimateStatus.Accepted })
];

class FakeEstimatesApi extends FakeApiCrud<Estimate>
{
    constructor()
    {
        super(fakeEstimates, ['reference'])
    }
    
    async toInvoice(estimateId: string): Promise<string> {
        const estimate = await this.getById(estimateId);
        if (estimate == null)
            return '';

        estimate.status = EnumEstimateStatus.Accepted;
        const invoice = InvoiceFactory.fromEstimate(estimate);
        const invoiceId = await invoiceApi.create(invoice);
        await this.update(estimate.id, estimate);
        return invoiceId;
    }
}

// Initialize the API with fake clients
export const api = new FakeEstimatesApi();