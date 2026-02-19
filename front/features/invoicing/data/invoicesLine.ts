import { PocketbaseCrud } from "@common/database/pocketbase";
import { Collections, type InvoicesLinesResponse } from "@common/database/types.g";

export type InvoiceLineData = InvoicesLinesResponse;
class InvoiceLineCrud extends PocketbaseCrud<InvoiceLineData> {
    constructor() {
        super(Collections.InvoicesLines);
    }
}

export const InvoiceLine = {
    totalHT(item: InvoiceLineData): number {
        return item.unitPrice * item.quantity;
    },
    totalTax(item: InvoiceLineData): number {
        return this.totalHT(item) * item.vatRate;
    }
}

export const invoicesLines = new InvoiceLineCrud();