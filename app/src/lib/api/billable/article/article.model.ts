import type { BaseEntity } from "@/lib/base/ApiCrud";
import type { BillableItem } from "@/lib/api/document";

export class StockArticle implements BillableItem, BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date | undefined;

    name: string;
    sku: string;
    description?: string;
    unitPrice: number;
    vatRate: number;

    quantity: number;

    isSelected: boolean;

    constructor() {
        this.id = '';
        this.createdAt = new Date();
        this.updatedAt = undefined;

        this.name = '';
        this.sku = '';
        this.unitPrice = 0;
        this.vatRate = 0.2;
        this.quantity = 0;
        this.description = '';
        this.isSelected = false;
    }

    get isNew(): boolean {
        return !this.id;
    }
}