import { database } from '@/database';
import type { Db } from 'mongodb';
import { CrudRepository } from '@/base/CrudRepository';
import type { BaseEntity } from "sagace-common/base/BaseEntity.ts";
import { type BillableItem, VatRateType } from './BillableItem';

export class StockArticle implements BillableItem, BaseEntity {
    _id: string = '';
    createdAt: Date = new Date();
    updatedAt: Date | undefined = undefined;

    name: string = '';
    sku: string = '';
    description?: string = '';
    unitPrice: number = 0;
    vatRateType: VatRateType = VatRateType.STANDARD;

    quantity: number = 0;

    isSelected: boolean = false;

    get isNew(): boolean {
        return !this._id;
    }
}

export class ArticlesRepository extends CrudRepository<StockArticle> {
    constructor(db: Db) {
        super(db.collection<StockArticle>('articles'), ['name', 'sku']);
    }
}

export const articlesRepo = new ArticlesRepository(database);