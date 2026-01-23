import { ApiCrud } from "@/base/api/ApiCrud";
import { ServiceDTO } from '@sagace/common';

export class Service extends ServiceDTO {

    isSelected: boolean = false;
}

export const api = new ApiCrud(Service, import.meta.env.VITE_API_URL + '/billables/services');