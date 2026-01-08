import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { CommercialDocument } from "./CommercialDocument.ts";
import settings from "@/lib/api/settings";

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

export const api = new ApiCrud(Estimate, settings.apiUrl + '/documents/estimates');