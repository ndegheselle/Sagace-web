import type { BaseEntity } from '../base/BaseEntity.ts';

export class ClientDTO implements BaseEntity {
    _id: string;
    createdAt: Date;
    updatedAt: Date | undefined;

    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    address: string;

    constructor(data: any = {}) {
        this._id = data._id || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt;
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.company = data.company || '';
        this.phone = data.phone || '';
        this.address = data.address || '';
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get isNew(): boolean {
        return !this._id;
    }
}
