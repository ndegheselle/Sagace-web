import { CrudRepository } from '@/base/CrudRepository.js';
import { database } from '@/database.js';
import type { Db } from 'mongodb';
import { ServiceDTO } from '@sagace/common/DTOs/billables/service.js';

export class Service extends ServiceDTO {
}

export class ServicesRepository extends CrudRepository<Service> {
    constructor(db: Db) {
        super(db.collection<Service>('services'), ['name', 'code']);
    }
}

export const servicesRepo = new ServicesRepository(database);