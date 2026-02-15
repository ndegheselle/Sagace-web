import { PocketbaseCrud, usePocketBase } from '@common/database/pocketbase';
import { Collections, type ArticlesResponse, type EstimatesLinesResponse, type ServicesResponse } from '@common/database/types.g';

type EstimateLineExpand = {
    article?: ArticlesResponse,
    service?: ServicesResponse
};

class EstimateLineCrud extends PocketbaseCrud<EstimateLineData> {
    constructor() {
        super(Collections.EstimatesLines, undefined, ['service', 'article']);
    }

    async getByParentAndItem(parentId: string, itemId: string): Promise<EstimateLineData | null> {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);

        const records = await collection.getList<EstimateLineData>(1, 1, { filter: `(article = "${itemId}" || service = "${itemId}" ) && estimate = "${parentId}"` });

        if (records.totalItems > 0 && records.items[0])
            return records.items[0];
        return null;
    }
}

export type EstimateLineData = EstimatesLinesResponse<EstimateLineExpand>;

export const Line = {
    isArticle(item: EstimateLineData) : boolean
    {
        return !!item.article;
    },
    isService(item: EstimateLineData) : boolean
    {
        return !!item.service;
    },
    totalHT(item: EstimateLineData): number {
        if (item.expand.article)
            return item.expand.article?.unitPrice * item.quantity;
        else if (item.expand.service)
            return item.expand.service?.unitPrice * item.quantity;
        return 0;
    },
    totalTax(item: EstimateLineData): number {
        const vatRate = item.expand.article?.vatRate ?? item.expand.service?.vatRate ?? 0;
        return this.totalHT(item) * vatRate;
    }
}

export const estimatesLines = new EstimateLineCrud();