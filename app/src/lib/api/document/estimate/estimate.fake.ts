import { FakeApiCrud } from "@/lib/base/FakeApiCrud";

import { fakeArticles } from "@/lib/api/billable/article/article.fake";
import { fakeServices } from "@/lib/api/billable/service/service.fake";
import { fakeClients } from "@/lib/api/client/client.fake";

import { Estimate, EnumEstimateStatus } from './estimate.model';

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
    const validUntil = overrides.validUntil ?? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    Object.assign(estimate, {
        id,
        reference,
        client,
        notes,
        status,
        validUntil,
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

// Initialize the API with fake clients
export const api = new FakeApiCrud<Estimate>(fakeEstimates, ['reference']);