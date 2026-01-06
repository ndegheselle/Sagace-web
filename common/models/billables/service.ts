import { type BillableItem, VatRateType } from "./BillableItem.ts";
import type { BaseEntity } from "../../base/BaseEntity.ts";

export class Service implements BillableItem, BaseEntity  {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined = undefined;

    name: string = '';
    code: string = '';
    description?: string = '';
    unitPrice: number = 0;
    vatRateType: VatRateType = VatRateType.STANDARD;
    durationHours?: number = 0; // optional duration info

    isSelected: boolean = false;

    get isNew(): boolean {
        return !this._id;
    }
}