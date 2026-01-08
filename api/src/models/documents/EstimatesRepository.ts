import { database } from '@/database';
import type { Db } from 'mongodb';
import { CrudRepository } from '@/base/CrudRepository';
import { CommercialDocument } from './CommercialDocument';

export enum EstimateStatus {
    Template,
    Draft,
    Sent,
    Accepted,
    Refused
}

export class Estimate extends CommercialDocument {
    reference: string = '';
    generatedAt?: Date;
    status: EstimateStatus = EstimateStatus.Draft;
}

export class EstimatesRepository extends CrudRepository<Estimate> {
    constructor(db: Db) {
        super(db.collection<Estimate>('estimates'), ['reference']);
    }
}

export const estimatesRepo = new EstimatesRepository(database);