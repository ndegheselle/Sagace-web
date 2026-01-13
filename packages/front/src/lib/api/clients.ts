import settings from "@/lib/api/settings";
import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { ClientDTO } from "sagace-common/DTOs/client";

export class Client extends ClientDTO {
    isSelected: boolean = false;
}

export const api = new ApiCrud(Client, settings.apiUrl + '/clients');