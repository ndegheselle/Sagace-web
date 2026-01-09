import settings from "@/lib/api/settings";
import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { EstimateDTO, EstimateStatus } from "sagace-common/DTOs/documents/estimate";

export class Estimate extends EstimateDTO {
}

export { EstimateStatus };
export const api = new ApiCrud(Estimate, settings.apiUrl + '/documents/estimates');