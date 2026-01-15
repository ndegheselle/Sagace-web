import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { ClientDTO } from "@sagace/common/DTOs/client";

export class Client extends ClientDTO {
    isSelected: boolean = false;
}

export const api = new ApiCrud(Client, import.meta.env.VITE_API_URL + '/clients');