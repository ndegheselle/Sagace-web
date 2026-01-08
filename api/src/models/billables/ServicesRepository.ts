import { database } from '@/database';
import type { Db } from 'mongodb';
import { CrudRepository } from '@/base/CrudRepository';
import type { BaseEntity } from "sagace-common/base/BaseEntity.ts";
import { type BillableItem, VatRateType } from './BillableItem';

export class Service implements BillableItem, BaseEntity  {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined = undefined;

    name: string = '';
    code: string = '';
    description?: string = '';
    unitPrice: number = 0;
    vatRateType: VatRateType = VatRateType.STANDARD;
    durationHours?: number = 0; // optional duration info

    isSelected: boolean = false;

    get isNew(): boolean {
        return !this._id;
    }
}

export class ServicesRepository extends CrudRepository<Service> {
    constructor(db: Db) {
        super(db.collection<Service>('services'), ['name', 'code']);
    }
}

export const servicesRepo = new ServicesRepository(database);