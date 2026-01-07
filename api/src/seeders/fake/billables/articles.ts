import { StockArticle } from 'sagace-common/models/billables/article';
import { VatRateType } from 'sagace-common/models/billables/BillableItem';

let articleCounter = 1;

function createFakeArticle(overrides: Partial<StockArticle> = {}): StockArticle {
    const article = new StockArticle();
    const now = new Date();

    const _id = overrides._id ?? `article-${articleCounter++}`;

    Object.assign(article, {
        _id,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now,
        name: overrides.name ?? `Article ${_id}`,
        sku: overrides.sku ?? `SKU-${_id.toUpperCase()}`,
        description: overrides.description ?? `Description for ${_id}`,
        unitPrice: overrides.unitPrice ?? 10,
        quantity: overrides.quantity ?? 0,
        vatRateType: overrides.vatRateType ?? VatRateType.STANDARD
    });

    return article;
}

export const fakeArticles: StockArticle[] = [
    createFakeArticle({ name: "Wireless Mouse", sku: "MOUSE-WL-001", unitPrice: 29.99, quantity: 150, vatRateType: VatRateType.REDUCED }),
    createFakeArticle({ name: "Mechanical Keyboard", sku: "KEY-MECH-002", unitPrice: 89.99, quantity: 8 }),
    createFakeArticle({ name: "USB-C Cable", sku: "CABLE-USBC-003", unitPrice: 9.99, quantity: 500 }),
    createFakeArticle({ name: "27\" Monitor", sku: "MON-27-004", unitPrice: 249.99, quantity: 45 }),
    createFakeArticle({ name: "Laptop Stand", sku: "STAND-LAP-005", unitPrice: 39.99, quantity: 0 }),
];