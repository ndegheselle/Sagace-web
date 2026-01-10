import { fakeArticles } from '@/seeders/fake/billables/articles';
import { fakeServices } from '@/seeders/fake/billables/services';
import { fakeClients } from '@/seeders/fake/clients';
import { Estimate, EstimateStatus } from '@/models/documents/EstimatesRepository';

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

    const _id = overrides._id ?? `estimate-${estimateCounter++}`;
    const clientId = overrides.clientId ?? fakeClients[estimateCounter % fakeClients.length]._id;
    const reference = overrides.reference ?? createRandomRef();
    const notes = overrides.notes ?? `Notes for ${reference}`;
    const status = overrides.status ?? EstimateStatus.Draft;

    Object.assign(estimate, {
        _id,
        reference,
        clientId,
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
export const fakeEstimates = [
    createFakeEstimate({}),
    createFakeEstimate({}),
    createFakeEstimate({ status: EstimateStatus.Sent }),
    createFakeEstimate({ status: EstimateStatus.Accepted })
];