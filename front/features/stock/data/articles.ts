import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ArticlesResponse } from '@common/database/types.g';

export type ArticleData = ArticlesResponse;
export const articles = new PocketbaseCrud<ArticleData>('articles', ['name', 'description', 'sku']);