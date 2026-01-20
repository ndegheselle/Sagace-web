import { database } from '@/database';
import type { Db } from 'mongodb';
import { ClientDTO } from '@sagace/common';
import { CrudRepository } from '../base/CrudRepository';

export class Client extends ClientDTO {
}

export class ClientsRepository extends CrudRepository<Client> {
    constructor(db: Db) {
        super(db.collection<Client>('clients'), ['firstName', 'lastName', 'email', 'phone']);
    }
}

export const clientsRepo = new ClientsRepository(database);