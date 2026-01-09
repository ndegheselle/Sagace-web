import type { BaseEntity } from '@/base/BaseEntity';
import { type BillableItem, VatRateType } from "./BillableItem.ts";

export class ServiceDTO implements BillableItem, BaseEntity  {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined = undefined;

    name: string = '';
    code: string = '';
    description?: string = '';
    unitPrice: number = 0;
    vatRateType: VatRateType = VatRateType.STANDARD;
    durationHours?: number = 0; // optional duration info

    get isNew(): boolean {
        return !this._id;
    }
}