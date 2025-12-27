import type { BaseEntity } from "@/lib/base/ApiCrud";
import { type BillableItem, VatRateType } from "@/lib/api/billable/BillableItem";

export class StockArticle implements BillableItem, BaseEntity {
    id: string = '';
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
        return !this.id;
    }
}