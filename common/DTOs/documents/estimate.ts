import { CommercialDocument } from "./CommercialDocument.ts";

export enum EstimateStatus {
    Template,
    Draft,
    Sent,
    Accepted,
    Refused
}

export class EstimateDTO extends CommercialDocument {
    reference: string = '';
    generatedAt?: Date;
    status: EstimateStatus = EstimateStatus.Draft;

    constructor(data: any = {}) {
        super(data); // Call the parent class constructor

        this.reference = data.reference || '';
        this.generatedAt = data.generatedAt;
        this.status = data.status || EstimateStatus.Draft;
    }
}