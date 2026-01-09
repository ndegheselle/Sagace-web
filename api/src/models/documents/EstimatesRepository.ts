import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import type { Db } from 'mongodb';
import { EstimateDTO } from 'sagace-common/DTOs/documents/estimate';

export class Estimate extends EstimateDTO {
}

export class EstimatesRepository extends CrudRepository<Estimate> {
    constructor(db: Db) {
        super(db.collection<Estimate>('estimates'), ['reference']);
    }
}

export const estimatesRepo = new EstimatesRepository(database);