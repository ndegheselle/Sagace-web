import type { BaseEntity } from '../../base/BaseEntity.js';
import { type BillableItem, BillableItemType, VatRateType } from "./BillableItem.js";

export class ServiceDTO implements BillableItem, BaseEntity {
    _id: string;
    type: BillableItemType = BillableItemType.SERVICE;
    createdAt: Date;
    updatedAt?: Date;

    name: string;
    code: string;
    description?: string;
    unitPrice: number;
    vatRateType: VatRateType;
    durationHours?: number;

    constructor(data: any = {}) {
        this._id = data._id || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt;
        this.name = data.name || '';
        this.code = data.code || '';
        this.description = data.description;
        this.unitPrice = data.unitPrice || 0;
        this.vatRateType = data.vatRateType || VatRateType.STANDARD;
        this.durationHours = data.durationHours;
    }

    get isNew(): boolean {
        return !this._id;
    }
}
