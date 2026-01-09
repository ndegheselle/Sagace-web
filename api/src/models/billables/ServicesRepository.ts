import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import type { Db } from 'mongodb';
import { ServiceDTO } from 'sagace-common/DTOs/billables/service';

export class Service extends ServiceDTO {
}

export class ServicesRepository extends CrudRepository<Service> {
    constructor(db: Db) {
        super(db.collection<Service>('services'), ['name', 'code']);
    }
}

export const servicesRepo = new ServicesRepository(database);