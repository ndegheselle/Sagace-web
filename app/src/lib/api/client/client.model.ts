import type { BaseEntity } from "@/lib/base/ApiCrud";

export class Client implements BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date | undefined;

    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    address: string;

    constructor() {
        this.id = '';
        this.createdAt = new Date();
        this.updatedAt = undefined;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.company = '';
        this.phone = '';
        this.address = '';
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    get isNew(): boolean {
        return !this.id;
    }
}