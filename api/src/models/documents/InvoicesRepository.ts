import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import type { Db } from 'mongodb';
import { InvoiceDTO } from 'sagace-common/DTOs/documents/invoice';

export class Invoice extends InvoiceDTO {
}

export class InvoicesRepository extends CrudRepository<Invoice> {
    constructor(db: Db) {
        super(db.collection<Invoice>('invoices'), ['invoiceNumber']);
    }
}

export const invoicesRepo = new InvoicesRepository(database);