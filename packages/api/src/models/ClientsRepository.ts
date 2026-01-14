import { database } from '@/database.js';
import type { Db } from 'mongodb';
import { ClientDTO } from '@sagace/common/DTOs/client.js';
import { CrudRepository } from '../base/CrudRepository.js';

export class Client extends ClientDTO {
}

export class ClientsRepository extends CrudRepository<Client> {
    constructor(db: Db) {
        super(db.collection<Client>('clients'), ['firstName', 'lastName', 'email', 'phone']);
    }
}

export const clientsRepo = new ClientsRepository(database);