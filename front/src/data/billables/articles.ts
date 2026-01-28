import { ApiCrud } from "@/base/api/ApiCrud";
import { StockArticleDTO } from '@sagace/common';

export class StockArticle extends StockArticleDTO {
    isSelected: boolean = false;
}

export const api = new ApiCrud(StockArticle, import.meta.env.VITE_API_URL + '/billables/articles');