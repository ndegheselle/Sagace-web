import { CommercialDocument } from "./CommercialDocument.js";

export enum InvoiceStatus {
    Issued,
    Paid,
    Overdue,
    Cancelled
}

export class InvoiceDTO extends CommercialDocument {
    invoiceNumber: string;
    dueDate: Date;

    issuedAt: Date;
    paidAt?: Date;
    paymentMethod?: string;

    estimateId?: string;

    constructor(data: any = {}) {
        super(data); // Call the parent class constructor

        this.invoiceNumber = data.invoiceNumber || '';
        this.dueDate = data.dueDate || new Date();
        this.issuedAt = data.issuedAt || new Date();
        this.paidAt = data.paidAt;
        this.paymentMethod = data.paymentMethod;
        this.estimateId = data.estimateId;
    }

    get status(): InvoiceStatus {
        if (this.paidAt) {
            return InvoiceStatus.Paid;
        }

        if (
            this.dueDate &&
            new Date(this.dueDate).getTime() < new Date().getTime()
        ) {
            return InvoiceStatus.Overdue;
        }

        return InvoiceStatus.Issued;
    }
}