import { CommercialDocument } from "@/lib/api/document";

export enum EnumEstimateStatus {
    Template,
    Draft,
    Sent,
    Accepted,
    Refused
}

export class Estimate extends CommercialDocument {
    reference: string = '';
    generatedAt?: Date;
    status: EnumEstimateStatus = EnumEstimateStatus.Draft;
}