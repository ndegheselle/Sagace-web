import { BillableItemType, VatRateType } from "./BillableItem.js";
export class StockArticleDTO {
    constructor(data = {}) {
        this.type = BillableItemType.ARTICLE;
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
    get isNew() {
        return !this._id;
    }
}
