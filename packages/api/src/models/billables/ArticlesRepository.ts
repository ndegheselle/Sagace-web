import { CrudRepository } from '@/base/CrudRepository.js';
import { database } from '@/database.js';
import type { Db } from 'mongodb';
import { StockArticleDTO } from '@sagace/common/DTOs/billables/article.js';

export class StockArticle extends StockArticleDTO {
}

export class ArticlesRepository extends CrudRepository<StockArticle> {
    constructor(db: Db) {
        super(db.collection<StockArticle>('articles'), ['name', 'sku']);
    }
}

export const articlesRepo = new ArticlesRepository(database);