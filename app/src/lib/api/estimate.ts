import { Client } from '@/lib/api/client';
import { FakeApiCrud } from "@/lib/base/FakeApiCrud";
import type { BaseEntity } from "@/lib/base/ApiCrud";

import { fakeClients } from '@/lib/api/client';
import { fakeArticles } from '@/lib/api/article';
import { fakeServices } from '@/lib/api/service';

export interface BillableItem {
    id: string;
    name: string;
    price: number;
}

export class EstimateLine {
    item: BillableItem;
    quantity: number;

    constructor(item: BillableItem, quantity: number) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        this.item = item;
        this.quantity = quantity;
    }

    get total(): number {
        return this.item.price * this.quantity;
    }
}

export enum EnumEstimateStatus {
    Draft,
    Sent,
    Accepted
}

export class Estimate implements BaseEntity {
    id: string;
    reference: string;

    client: Client | undefined;
    lines: EstimateLine[];
    createdAt: Date;
    updatedAt: Date;
    validUntil?: Date;
    notes: string;
    status: EnumEstimateStatus;

    constructor() {
        this.id = '';
        this.reference = '';
        this.client = undefined;
        this.lines = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.validUntil = undefined;
        this.notes = '';
        this.status = EnumEstimateStatus.Draft;
    }

    addItem(item: BillableItem, quantity: number) {
        const existing = this.lines.find(
            l => l.item.id === item.id
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            this.lines.push(new EstimateLine(item, quantity));
        }

        this.updatedAt = new Date();
    }

    removeItem(itemId: string) {
        this.lines = this.lines.filter(
            l => l.item.id !== itemId
        );
        this.updatedAt = new Date();
    }

    get totalHT(): number {
        return this.lines.reduce((sum, line) => sum + line.total, 0);
    }

    get tva(): number {
        return this.totalHT * 0.2;
    }

    get totalTTC(): number {
        return this.totalHT + this.tva;
    }
}

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