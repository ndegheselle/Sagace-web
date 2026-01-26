import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import { EstimateDTO, EstimateStatus } from '@sagace/common';
import type { Db } from 'mongodb';

export class Estimate extends EstimateDTO {
}
export { EstimateStatus };

function generateCode() {
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('');

  const numbers = Math.floor(100000 + Math.random() * 900000);

  return `${letters}-${numbers}`;
}

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

    override async create(data: Estimate): Promise<string> {
        data.reference = generateCode();
        return super.create(data);
    }

    async countDraft(): Promise<number> {
        return this.collection.countDocuments({status: EstimateStatus.Draft});
    }
    
    async countSent(): Promise<number> {
        return this.collection.countDocuments({status: EstimateStatus.Sent});
    }
}

export const estimatesRepo = new EstimatesRepository(database);