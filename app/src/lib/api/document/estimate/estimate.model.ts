import { CommercialDocument } from "@/lib/api/document";

export enum EnumEstimateStatus {
    Draft,
    Sent,
    Accepted,
    Refused
}

export class Estimate extends CommercialDocument {
    validUntil?: Date;
    status: EnumEstimateStatus = EnumEstimateStatus.Draft;
}