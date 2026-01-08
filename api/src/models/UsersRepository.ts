import type { BaseEntity } from "sagace-common/base/BaseEntity.ts";
import type { Db } from 'mongodb';
import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';

export class Company {
    name: string = '';
    email: string = '';
    adress: string = '';
    SIRET: string = '';
    phone: string = '';
}

export class User implements BaseEntity {
    _id: string = '';
    email: string = '';
    name: string = '';
    password: string = '';
    company: Company = new Company();
}

export class UsersRepository extends CrudRepository<User> {
    constructor(db: Db) {
        super(db.collection<User>('users'), ['email', 'name'], { password: 0 });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.collection.findOne({ email });
    }
}
export const usersRepo = new UsersRepository(database);