import { database } from '@/database';
import type { Db } from 'mongodb';
import { Client } from 'sagace-common/models/client';
import { CrudRepository } from '../base/CrudRepository';

export class ClientsRepository extends CrudRepository<Client> {
    constructor(db: Db) {
        super(db.collection<Client>('clients'), ['firstName', 'lastName', 'email', 'phone']);
    }
}

export type { Client };
export const clientsRepo = new ClientsRepository(database);