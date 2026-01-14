import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import type { Db } from 'mongodb';
import { UserDTO, CompanyDTO } from '@sagace/common/DTOs/user';

export class User extends UserDTO{
    password: string = '';
}

export { CompanyDTO as Company}

export class UsersRepository extends CrudRepository<User> {
    constructor(db: Db) {
        super(db.collection<User>('users'), ['email', 'name'], { password: 0 });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.collection.findOne({ email });
    }
}
export const usersRepo = new UsersRepository(database);