import { CommercialDocument } from "@/lib/api/document";

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
            this.dueDate.getTime() < new Date().getTime()
        ) {
            return InvoiceStatus.Overdue;
        }

        if (this.issuedAt) {
            return InvoiceStatus.Issued;
        }

        return InvoiceStatus.Draft;
    }
}