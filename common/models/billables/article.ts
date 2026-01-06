import { type BillableItem, VatRateType } from "./BillableItem.ts";
import type { BaseEntity } from "../../base/BaseEntity.ts";

export class StockArticle implements BillableItem, BaseEntity {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined = undefined;

    name: string = '';
    sku: string = '';
    description?: string = '';
    unitPrice: number = 0;
    vatRateType: VatRateType = VatRateType.STANDARD;

    quantity: number = 0;

    isSelected: boolean = false;

    get isNew(): boolean {
        return !this._id;
    }
}