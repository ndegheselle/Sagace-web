import type { BaseEntity } from "@/lib/base/ApiCrud";
import { type BillableItem, VatRateType } from "@/lib/api/billable/BillableItem";

export class Service implements BillableItem, BaseEntity  {
    id: string = '';
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
        return !this.id;
    }
}