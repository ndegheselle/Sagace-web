import { BillableItemType, VatRateType } from "./BillableItem.js";
export class ServiceDTO {
    constructor(data = {}) {
        this.type = BillableItemType.SERVICE;
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
    get isNew() {
        return !this._id;
    }
}
