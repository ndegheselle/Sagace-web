import type { BaseEntity } from '@/base/BaseEntity';
import { type BillableItem, VatRateType } from "./BillableItem.ts";

export class StockArticleDTO implements BillableItem, BaseEntity {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined = undefined;

    name: string = '';
    sku: string = '';
    description?: string = '';
    unitPrice: number = 0;
    vatRateType: VatRateType = VatRateType.STANDARD;

    quantity: number = 0;

    get isNew(): boolean {
        return !this._id;
    }
}