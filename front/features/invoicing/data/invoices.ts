import { PocketbaseCrud } from "@common/database/pocketbase";
import { Collections, type InvoicesResponse, InvoicesStatusOptions, type ClientsResponse } from "@common/database/types.g";
import { addDays, endOfMonth } from "@common/utils/date";
import type { EstimateData } from "@features/invoicing/data/estimates";
import { EstimateLine } from "@features/invoicing/data/estimatesLine";
import { InvoiceLine, invoicesLines, type InvoiceLineData } from "@features/invoicing/data/invoicesLine";

type InvoiceExpand = {
    client: ClientsResponse;
    lines?: InvoiceLineData[];
};

export type InvoiceData = InvoicesResponse<InvoiceExpand>;

export { InvoicesStatusOptions as EnumInvoiceStatus };

class InvoiceCrud extends PocketbaseCrud<InvoiceData> {
    constructor() {
        super(Collections.Invoices, ['number'], ['client', 'lines']);
    }

    /**
     * Convert an estimate to an invoice (lines included)
     * @param estimate 
     * @returns the id of the invoice created
     */
    async fromEstimate(estimate: EstimateData): Promise<string> {
        const issuedAt = new Date();
        const plus45 = addDays(issuedAt, 45);
        const dueDate= endOfMonth(plus45);

        const invoice = {
            client: estimate.client,
            notes: '',
            status: InvoicesStatusOptions.ISSUED,
            estimate: estimate.id,
            dueDate: dueDate.toISOString(),
            issuedAt: issuedAt.toISOString(),
        } as InvoiceData;

        const invoiceApi = await this.create(invoice);
        const linesId: string[] = [];
        for (const line of estimate.expand.lines ?? []) {
            const infos = EstimateLine.getInfos(line);
            const invoiceLine = {
                name: infos.name,
                description: infos.description,
                vatRate: infos.vatRate,
                unitPrice: infos.unitPrice,
                quantity: line.quantity,
                invoice: invoiceApi.id
            } as InvoiceLineData;
            const invoiceLineApi = await invoicesLines.create(invoiceLine);
            linesId.push(invoiceLineApi.id);
        }

        await this.collection.update(invoiceApi.id, { "lines+": linesId });
        return invoiceApi.id;
    }
}

export const Invoice = {
    totalHT(invoice?: InvoiceData): number {
        if (!invoice)
            return 0;

        return invoice.expand.lines?.reduce((sum, line) => sum + InvoiceLine.totalHT(line), 0) ?? 0;
    },
    totalTax(invoice?: InvoiceData): number {
        if (!invoice)
            return 0;

        return invoice.expand.lines?.reduce((sum, line) => sum + InvoiceLine.totalTax(line), 0) ?? 0;
    },
    totalTTC(invoice?: InvoiceData): number {
        return this.totalHT(invoice) + this.totalTax(invoice);
    }
};

export const invoices = new InvoiceCrud();