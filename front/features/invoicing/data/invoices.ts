import { PocketbaseCrud } from "@common/database/pocketbase";
import { Collections, type InvoicesResponse } from "@common/database/types.g";
import type { EstimateData } from "@features/invoicing/data/estimates";

export type InvoiceData = InvoicesResponse;


class InvoiceCrud extends PocketbaseCrud<InvoiceData> {
    constructor() {
        super(Collections.Invoices, ['invoiceNumber'], ['lines.article', 'lines.service']);
    }

    async fromEstimate(estimate: EstimateData) : Promise<string>
    {
        return;
    }
}

export const invoices = new InvoiceCrud();