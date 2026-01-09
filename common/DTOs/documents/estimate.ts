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
}