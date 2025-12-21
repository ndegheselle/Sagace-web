import { FakeApiCrud } from "@/lib/base/FakeApiCrud";
import type { BillableItem } from "./estimate";
import type { BaseEntity } from "@/lib/base/ApiCrud";

export class StockArticle implements BillableItem, BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date | undefined;

    name: string;
    sku: string;
    description?: string;
    price: number;
    quantity: number;

    constructor() {
        this.id = '';
        this.createdAt = new Date();
        this.updatedAt = undefined;

        this.name = '';
        this.sku = '';
        this.price = 0;
        this.quantity = 0;
        this.description = '';
    }

    get isNew(): boolean {
        return !this.id;
    }
}

let articleCounter = 1;

function createFakeArticle(overrides: Partial<StockArticle> = {}): StockArticle {
    const article = new StockArticle();
    const now = new Date();

    const id = overrides.id ?? `article-${articleCounter++}`;

    Object.assign(article, {
        id,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now,
        name: overrides.name ?? `Article ${id}`,
        sku: overrides.sku ?? `SKU-${id.toUpperCase()}`,
        description: overrides.description ?? `Description for ${id}`,
        price: overrides.price ?? 10,
        quantity: overrides.quantity ?? 0,
    });

    return article;
}

export const fakeArticles: StockArticle[] = [
    createFakeArticle({ name: "Wireless Mouse", sku: "MOUSE-WL-001", price: 29.99, quantity: 150 }),
    createFakeArticle({ name: "Mechanical Keyboard", sku: "KEY-MECH-002", price: 89.99, quantity: 8 }),
    createFakeArticle({ name: "USB-C Cable", sku: "CABLE-USBC-003", price: 9.99, quantity: 500 }),
    createFakeArticle({ name: "27\" Monitor", sku: "MON-27-004", price: 249.99, quantity: 45 }),
    createFakeArticle({ name: "Laptop Stand", sku: "STAND-LAP-005", price: 39.99, quantity: 0 }),
];

// Initialize the API with fake clients
export const api = new FakeApiCrud<StockArticle>(fakeArticles, ['name', 'sku']);