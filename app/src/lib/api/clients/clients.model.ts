import type { BaseEntity } from "@/lib/base/ApiCrud";

export class Client implements BaseEntity {
    id: string = '';
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
        return !this.id;
    }
}