import { ApiCrud } from "@/lib/base/api/ApiCrud";
import { StockArticleDTO } from "@sagace/common/DTOs/billables/article";

export class StockArticle extends StockArticleDTO {
    isSelected: boolean = false;
}

export const api = new ApiCrud(StockArticle, import.meta.env.VITE_API_URL + '/billables/articles');