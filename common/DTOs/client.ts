import type { BaseEntity } from '@/base/BaseEntity';

export class ClientDTO implements BaseEntity {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined;

    firstName: string = '';
    lastName: string = '';
    email: string = '';
    company: string = '';
    phone: string = '';
    address: string = '';

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    get isNew(): boolean {
        return !this._id;
    }
}