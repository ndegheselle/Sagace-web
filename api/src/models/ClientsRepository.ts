import { database } from '@/database';
import type { Db } from 'mongodb';
import type { BaseEntity } from "sagace-common/base/BaseEntity.ts";
import { CrudRepository } from '../base/CrudRepository';

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

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    get isNew(): boolean {
        return !this._id;
    }
}

export class ClientsRepository extends CrudRepository<Client> {
    constructor(db: Db) {
        super(db.collection<Client>('clients'), ['firstName', 'lastName', 'email', 'phone']);
    }
}

export const clientsRepo = new ClientsRepository(database);