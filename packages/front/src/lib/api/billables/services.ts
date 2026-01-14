import settings from "@/lib/api/settings";
import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { ServiceDTO } from "@sagace/common/DTOs/billables/service";

export class Service extends ServiceDTO {

    isSelected: boolean = false;
}

export const api = new ApiCrud(Service, settings.apiUrl + '/billables/services');