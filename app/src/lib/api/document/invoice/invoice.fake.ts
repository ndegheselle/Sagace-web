import { FakeApiCrud } from "@/lib/base/FakeApiCrud";

import { fakeArticles } from "@/lib/api/billable/article/article.fake";
import { fakeServices } from "@/lib/api/billable/service/service.fake";
import { fakeClients } from "@/lib/api/client/client.fake";

import { Invoice, InvoiceStatus } from "./invoice.model";
import { Estimate } from "@/lib/api/document/estimate";

let invoiceCounter = 1;
function createInvoiceNumber(counter: number): string {
    return `F-${new Date().getFullYear()}-${counter.toString().padStart(6, "0")}`;
}

function createFakeInvoice(overrides: Partial<Invoice> = {}): Invoice {
    const invoice = new Invoice();
    const now = new Date();

    const issuedAt = overrides.issuedAt ?? now;
    const dueDate =
        overrides.dueDate ??
        new Date(issuedAt.getTime() + 14 * 24 * 60 * 60 * 1000);

    Object.assign(invoice, {
        id: overrides.id ?? `invoice-${invoiceCounter}`,
        invoiceNumber: overrides.invoiceNumber ?? createInvoiceNumber(invoiceCounter),
        client: overrides.client ?? fakeClients[invoiceCounter % fakeClients.length],
        issuedAt,
        dueDate,
        paidAt: overrides.paidAt,
        paymentMethod: overrides.paymentMethod,
        estimateId: overrides.estimateId,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now
    });

    invoiceCounter++;

    // Articles
    invoice.addItem(fakeArticles[0]!, 1);
    invoice.addItem(fakeArticles[1]!, 3);

    // Services
    invoice.addItem(fakeServices[0]!, 8);  // 8 hours
    invoice.addItem(fakeServices[1]!, 4);  // 4 hours

    return invoice;
}

// Create multiple fake invoices
const fakeInvoices = [
    createFakeInvoice({}),
    createFakeInvoice({ status: InvoiceStatus.Issued }),
    createFakeInvoice({
        status: InvoiceStatus.Paid,
        paidAt: new Date(),
        paymentMethod: "Credit Card"
    }),
    createFakeInvoice({
        status: InvoiceStatus.Overdue,
        issuedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    })
];

class FakeInvoicesApi extends FakeApiCrud<Invoice>
{
    constructor()
    {
        super(fakeInvoices, ["invoiceNumber"]);
    }
}

export class InvoiceFactory {
    static fromEstimate(estimate: Estimate): Invoice {
        const invoice = new Invoice();

        // Copy common fields from CommercialDocument
        invoice.id = estimate.id;
        invoice.invoiceNumber = createInvoiceNumber(invoiceCounter++);
        invoice.client = estimate.client;
        invoice.lines = [...estimate.lines]; // Copy all billable lines
        invoice.notes = estimate.notes;
        invoice.createdAt = new Date();
        invoice.updatedAt = new Date();

        // Set invoice-specific fields
        invoice.estimateId = estimate.id;
        invoice.issuedAt = new Date(); // Set issuedAt to current date
        invoice.dueDate = new Date();
        invoice.dueDate.setDate(invoice.dueDate.getDate() + 30); // Default: due in 30 days

        return invoice;
    }
}

// Initialize the API with fake invoices
export const api = new FakeInvoicesApi();
