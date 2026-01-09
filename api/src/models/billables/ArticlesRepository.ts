import { CrudRepository } from '@/base/CrudRepository';
import { database } from '@/database';
import type { Db } from 'mongodb';
import { StockArticleDTO } from 'sagace-common/DTOs/billables/article';

export class StockArticle extends StockArticleDTO {
}

export class ArticlesRepository extends CrudRepository<StockArticle> {
    constructor(db: Db) {
        super(db.collection<StockArticle>('articles'), ['name', 'sku']);
    }
}

export const articlesRepo = new ArticlesRepository(database);