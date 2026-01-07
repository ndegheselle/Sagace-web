import { fakeArticles } from '@/seeders/fake/billables/articles';
import { fakeServices } from '@/seeders/fake/billables/services';
import { fakeClients } from '@/seeders/fake/clients';
import { Invoice, InvoiceStatus } from 'sagace-common/models/documents/invoice';

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
        _id: overrides._id ?? `invoice-${invoiceCounter}`,
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
export const fakeInvoices = [
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
