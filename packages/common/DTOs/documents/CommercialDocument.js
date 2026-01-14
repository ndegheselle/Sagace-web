import { StockArticleDTO } from '../billables/article.js';
import { BillableItemType } from '../billables/BillableItem.js';
import { ServiceDTO } from '../billables/service.js';
import { ClientDTO } from '../client.js';
export class BillableLine {
    constructor(item, quantity) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        this.item = item.type === BillableItemType.ARTICLE ? new StockArticleDTO(item) : new ServiceDTO(item);
        this.unitPrice = this.item.unitPrice;
        this.vatRate = this.item.vatRateType;
        this.quantity = quantity;
    }
    get totalHT() {
        return this.unitPrice * this.quantity;
    }
    get tva() {
        return this.totalHT * this.vatRate;
    }
}
export class CommercialDocument {
    constructor(data = {}) {
        this._id = '';
        this.lines = [];
        this.notes = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this._id = data._id || '';
        this.clientId = data.clientId;
        this.client = data.client || new ClientDTO(data.client);
        this.lines = data.lines?.map((line) => new BillableLine(line.item, line.quantity)) || [];
        this.notes = data.notes || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
    get totalHT() {
        return this.lines.reduce((sum, line) => sum + line.totalHT, 0);
    }
    get tva() {
        return this.lines.reduce((sum, line) => sum + line.tva, 0);
    }
    get totalTTC() {
        return this.totalHT + this.tva;
    }
    addItem(item, quantity) {
        const existing = this.lines.find(l => l.item._id === item._id);
        if (existing) {
            existing.quantity += quantity;
        }
        else {
            this.lines.push(new BillableLine(item, quantity));
        }
        this.updatedAt = new Date();
    }
    removeItem(itemId) {
        this.lines = this.lines.filter(l => l.item._id !== itemId);
        this.updatedAt = new Date();
    }
}
