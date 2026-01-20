import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import { CompanyDTO, UserDTO } from '@sagace/common';
import type { Db } from 'mongodb';

export class User extends UserDTO{
    password: string = '';
}

export { CompanyDTO as Company };

export class UsersRepository extends CrudRepository<User> {
    constructor(db: Db) {
        super(db.collection<User>('users'), ['email', 'name'], { password: 0 });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.collection.findOne({ email });
    }

    async updateCompanyLogo(userId: string, logoUrl: string): Promise<void> {
        await this.collection.updateOne({_id: userId}, { '$set': {"company.logoUrl" : logoUrl}});
    }

    async updateCompany(userId: string, company: CompanyDTO): Promise<void> {
        await this.collection.updateOne({_id: userId}, { '$set': {company}});
    }
}
export const usersRepo = new UsersRepository(database);