import { database } from '@/database';
import type { Db } from 'mongodb';
import { CrudRepository } from '@/base/CrudRepository';
import { CommercialDocument } from './CommercialDocument';

export enum InvoiceStatus {
    Draft,
    Issued,
    Paid,
    Overdue,
    Cancelled
}

export class Invoice extends CommercialDocument {
    invoiceNumber: string = '';
    dueDate: Date = new Date();

    issuedAt?: Date = new Date();
    paidAt?: Date;
    paymentMethod?: string;

    estimateId?: string;

    get status(): InvoiceStatus {
        if (this.paidAt) {
            return InvoiceStatus.Paid;
        }

        if (
            this.issuedAt &&
            this.dueDate &&
            new Date(this.dueDate).getTime() < new Date().getTime()
        ) {
            return InvoiceStatus.Overdue;
        }

        if (this.issuedAt) {
            return InvoiceStatus.Issued;
        }

        return InvoiceStatus.Draft;
    }
}

export class InvoicesRepository extends CrudRepository<Invoice> {
    constructor(db: Db) {
        super(db.collection<Invoice>('invoices'), ['invoiceNumber']);
    }
}

export const invoicesRepo = new InvoicesRepository(database);