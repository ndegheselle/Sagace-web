import type { BaseEntity } from "sagace-common/base/BaseEntity.ts";
import { Client } from "../ClientsRepository.ts";
import type { BillableItem } from "../billables/BillableItem.ts";

export class BillableLine {
    item: BillableItem;
    quantity: number;
    // Unit price and VAT rate are locked in
    unitPrice: number;
    vatRate: number;

    constructor(item: BillableItem, quantity: number) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        this.item = item;
        this.unitPrice = item.unitPrice;
        this.vatRate = item.vatRateType;
        this.quantity = quantity;
    }

    get totalHT(): number {
        return this.unitPrice * this.quantity;
    }

    get tva(): number {
        return this.totalHT * this.vatRate;
    }
}

export abstract class CommercialDocument implements BaseEntity {
    _id: string = '';
    clientId: string | null = null;
    lines: BillableLine[] = [];
    notes: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    get totalHT(): number {
        return this.lines.reduce((sum, line) => sum + line.totalHT, 0);
    }

    get tva(): number {
        return this.lines.reduce((sum, line) => sum + line.tva, 0);
    }

    get totalTTC(): number {
        return this.totalHT + this.tva;
    }

    addItem(item: BillableItem, quantity: number) {
        const existing = this.lines.find(
            l => l.item._id === item._id
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            this.lines.push(new BillableLine(item, quantity));
        }

        this.updatedAt = new Date();
    }

    removeItem(itemId: string) {
        this.lines = this.lines.filter(
            l => l.item._id !== itemId
        );
        this.updatedAt = new Date();
    }
}