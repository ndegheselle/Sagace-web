import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import type { Db } from 'mongodb';
import { EstimateDTO, EstimateStatus } from '@sagace/common';

export class Estimate extends EstimateDTO {
}
export { EstimateStatus };

export class EstimatesRepository extends CrudRepository<Estimate> {
    constructor(db: Db) {
        super(db.collection<Estimate>('estimates'), ['reference'], undefined, [
            {
                from: 'clients',
                localField: 'clientId',
                foreignField: '_id',
                as: 'client',
                unwind: true
            }
        ]);
    }
}

export const estimatesRepo = new EstimatesRepository(database);