import { CrudRepository } from '../base/CrudRepository';
import { Db } from 'mongodb';
import { Client } from 'sagace-common/models/client';

export class ClientsRepository extends CrudRepository<Client> {
    constructor(db: Db) {
        super(db.collection<Client>('clients'), ['firstName', 'lastName', 'email', 'phone']);
    }
}