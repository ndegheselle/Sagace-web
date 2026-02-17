import { PocketbaseCrud } from "@common/database/pocketbase";
import { Collections, type InvoicesResponse, InvoicesStatusOptions } from "@common/database/types.g";
import type { EstimateData } from "@features/invoicing/data/estimates";

export type InvoiceData = InvoicesResponse;

export { InvoicesStatusOptions as EnumInvoiceStatus };

class InvoiceCrud extends PocketbaseCrud<InvoiceData> {
    constructor() {
        super(Collections.Invoices, ['invoiceNumber'], ['lines.article', 'lines.service']);
    }

    async fromEstimate(estimate: EstimateData) : Promise<string>
    {
        const invoice = {
            client: estimate.client,
            notes: '',
            dueDate: InvoicesStatusOptions.ISSUED,
            paidAt: new Date(),
            estimate: estimate.id,
        };

        for(const line in estimate.expand.lines)
        {

        }
    }
}

export const invoices = new InvoiceCrud();