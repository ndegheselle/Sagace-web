import type { BaseEntity } from "@/lib/base/ApiCrud";
import type { BillableItem } from "@/lib/api/document";

export class Service implements BillableItem, BaseEntity  {
    id: string;
    createdAt: Date;
    updatedAt: Date | undefined;

    name: string;
    code: string;
    description?: string;
    unitPrice: number;
    vatRate: number;
    durationHours?: number; // optional duration info

    isSelected: boolean;

    constructor() {
        this.id = '';
        this.createdAt = new Date();
        this.updatedAt = undefined;

        this.name = '';
        this.code = '';
        this.unitPrice = 0;
        this.vatRate = 0.2;
        this.description = '';
        this.durationHours = undefined;
        this.isSelected = false;
    }

    get isNew(): boolean {
        return !this.id;
    }
}