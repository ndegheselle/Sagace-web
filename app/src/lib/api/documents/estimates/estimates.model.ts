import { CommercialDocument } from "@/lib/api/documents";

export enum EstimateStatus {
    Template,
    Draft,
    Sent,
    Accepted,
    Refused
}

export class Estimate extends CommercialDocument {
    reference: string = '';
    generatedAt?: Date;
    status: EstimateStatus = EstimateStatus.Draft;
}