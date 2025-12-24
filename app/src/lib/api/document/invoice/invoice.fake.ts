import { FakeApiCrud } from "@/lib/base/FakeApiCrud";

import { fakeArticles } from "@/lib/api/billable/article/article.fake";
import { fakeServices } from "@/lib/api/billable/service/service.fake";
import { fakeClients } from "@/lib/api/client/client.fake";

import { Invoice, InvoiceStatus } from "./invoice.model";

let invoiceCounter = 1;

function createRandomString(length: number, chars: string): string {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function createRandomInvoiceNumber(): string {
    return `INV-${new Date().getFullYear()}-${createRandomString(5, "0123456789")}`;
}

function createFakeInvoice(overrides: Partial<Invoice> = {}): Invoice {
    const invoice = new Invoice();
    const now = new Date();

    const issuedAt = overrides.issuedAt ?? now;
    const dueDate =
        overrides.dueDate ??
        new Date(issuedAt.getTime() + 14 * 24 * 60 * 60 * 1000);

    Object.assign(invoice, {
        id: overrides.id ?? `invoice-${invoiceCounter++}`,
        invoiceNumber: overrides.invoiceNumber ?? createRandomInvoiceNumber(),
        client: overrides.client ?? fakeClients[invoiceCounter % fakeClients.length],
        issuedAt,
        dueDate,
        paidAt: overrides.paidAt,
        paymentMethod: overrides.paymentMethod,
        estimateId: overrides.estimateId,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now
    });

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

// Initialize the API with fake invoices
export const api = new FakeApiCrud<Invoice>(fakeInvoices, ["invoiceNumber"]);
