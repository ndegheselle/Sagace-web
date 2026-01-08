import { ApiCrud } from "@/lib/base/api/ApiCrud";
import type { BaseEntity } from "sagace-common/base/BaseEntity.ts";
import settings from "@/lib/api/settings";

export class Client implements BaseEntity {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined;

    firstName: string = '';
    lastName: string = '';
    email: string = '';
    company: string = '';
    phone: string = '';
    address: string = '';

    isSelected: boolean = false;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    get isNew(): boolean {
        return !this._id;
    }

    static toJson(json: any): Client {
        const client = new Client();
        Object.assign(client, json);
        return client;
    }
}

export const api = new ApiCrud(Client, settings.apiUrl + '/clients');