import type { BaseEntity } from '../../base/BaseEntity';
import { type BillableItem, BillableItemType, VatRateType } from "./BillableItem";

export class StockArticleDTO implements BillableItem, BaseEntity {
    _id: string;
    type: BillableItemType = BillableItemType.ARTICLE;
    createdAt: Date;
    updatedAt: Date | undefined;

    name: string;
    sku: string;
    description?: string;
    unitPrice: number;
    vatRateType: VatRateType;

    quantity: number;

    constructor(data: any = {}) {
        this._id = data._id || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt;
        this.name = data.name || '';
        this.sku = data.sku || '';
        this.description = data.description;
        this.unitPrice = data.unitPrice || 0;
        this.vatRateType = data.vatRateType || VatRateType.STANDARD;
        this.quantity = data.quantity || 0;
    }

    get isNew(): boolean {
        return !this._id;
    }
}