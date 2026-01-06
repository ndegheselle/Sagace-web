import type { BaseEntity } from "../base/BaseEntity.ts";    

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
}