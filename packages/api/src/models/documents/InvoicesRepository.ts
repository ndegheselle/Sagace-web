import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import { Estimate } from '@/models/documents/EstimatesRepository';
import type { Db } from 'mongodb';
import { InvoiceDTO, InvoiceStatus } from '@sagace/common';

export class Invoice extends InvoiceDTO {
}
export { InvoiceStatus };

export class InvoicesRepository extends CrudRepository<Invoice> {
    constructor(db: Db) {
        super(db.collection<Invoice>('invoices'), ['invoiceNumber'], undefined, [
            {
                from: 'clients',
                localField: 'clientId',
                foreignField: '_id',
                as: 'client',
                unwind: true
            }
        ]);
    }

    async fromEstimate(estimate: Estimate): Promise<string> {
        const invoice = new Invoice();

        // Copy common fields from CommercialDocument
        invoice._id = estimate._id;
        invoice.invoiceNumber = createInvoiceNumber(await this.count() + 1);
        invoice.clientId = estimate.clientId;
        invoice.lines = [...estimate.lines];
        invoice.notes = estimate.notes;
        invoice.createdAt = new Date();
        invoice.updatedAt = new Date();

        // Set invoice-specific fields
        invoice.estimateId = estimate._id;
        invoice.issuedAt = new Date(); // Set issuedAt to current date
        invoice.dueDate = new Date();
        invoice.dueDate.setDate(invoice.dueDate.getDate() + 30); // Default: due in 30 days

        return this.create(invoice);
    }
}

function createInvoiceNumber(counter: number): string {
    return `F-${new Date().getFullYear()}-${counter.toString().padStart(6, "0")}`;
}

export const invoicesRepo = new InvoicesRepository(database);