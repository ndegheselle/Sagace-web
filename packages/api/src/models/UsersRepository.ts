import { CrudRepository } from '@/base/CrudRepository.js';
import { database } from '@/database.js';
import type { Db } from 'mongodb';
import { UserDTO, CompanyDTO } from '@sagace/common/DTOs/user.js';

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