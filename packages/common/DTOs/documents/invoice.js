import { CommercialDocument } from "./CommercialDocument.js";
export var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus[InvoiceStatus["Draft"] = 0] = "Draft";
    InvoiceStatus[InvoiceStatus["Issued"] = 1] = "Issued";
    InvoiceStatus[InvoiceStatus["Paid"] = 2] = "Paid";
    InvoiceStatus[InvoiceStatus["Overdue"] = 3] = "Overdue";
    InvoiceStatus[InvoiceStatus["Cancelled"] = 4] = "Cancelled";
})(InvoiceStatus || (InvoiceStatus = {}));
export class InvoiceDTO extends CommercialDocument {
    constructor(data = {}) {
        super(data); // Call the parent class constructor
        this.invoiceNumber = data.invoiceNumber || '';
        this.dueDate = data.dueDate || new Date();
        this.issuedAt = data.issuedAt || new Date();
        this.paidAt = data.paidAt;
        this.paymentMethod = data.paymentMethod;
        this.estimateId = data.estimateId;
    }
    get status() {
        if (this.paidAt) {
            return InvoiceStatus.Paid;
        }
        if (this.issuedAt &&
            this.dueDate &&
            new Date(this.dueDate).getTime() < new Date().getTime()) {
            return InvoiceStatus.Overdue;
        }
        if (this.issuedAt) {
            return InvoiceStatus.Issued;
        }
        return InvoiceStatus.Draft;
    }
}
