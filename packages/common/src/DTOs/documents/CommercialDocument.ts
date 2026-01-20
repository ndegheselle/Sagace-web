import type { BaseEntity } from '../../base/BaseEntity.js';
import { StockArticleDTO } from '../billables/article.js';
import { BillableItemType, type BillableItem } from '../billables/BillableItem.js';
import { ServiceDTO } from '../billables/service.js';
import { ClientDTO } from '../client.js';

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

        this.item = item.type === BillableItemType.ARTICLE ? new StockArticleDTO(item) : new ServiceDTO(item);
        this.unitPrice = this.item.unitPrice;
        this.vatRate = this.item.vatRateType;
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
    _id: string;
    clientId?: string;
    client?: ClientDTO;

    lines: BillableLine[];
    notes: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: any = {}) {
        this._id = data._id || '';
        this.clientId = data.clientId;
        this.client = data.client || new ClientDTO(data.client);
        this.lines = data.lines?.map((line: any) => new BillableLine(line.item, line.quantity)) || [];
        this.notes = data.notes || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

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
