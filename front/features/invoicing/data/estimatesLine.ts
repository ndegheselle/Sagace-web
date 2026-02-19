import { PocketbaseCrud, usePocketBase } from '@common/database/pocketbase';
import { Collections, type ArticlesResponse, type EstimatesLinesResponse, type ServicesResponse } from '@common/database/types.g';

type EstimateLineExpand = {
    article?: ArticlesResponse,
    service?: ServicesResponse
};

export type LineInfos = {
    name: string,
    description: string,
    vatRate: number,
    unitPrice: number,
}

class EstimateLineCrud extends PocketbaseCrud<EstimateLineData> {
    constructor() {
        super(Collections.EstimatesLines, undefined, ['service', 'article']);
    }

    /**
     * Check if a line exist for an item in an estimate.
     * @param parentId id of the estimate
     * @param itemId id of the item
     * @returns the line or null if doesn't exist
     */
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

export const EstimateLine = {
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
    },
    getInfos(line?: EstimateLineData): LineInfos
    {
        return {
            name: line?.expand.article?.name ?? line?.expand.service?.name ?? "",
            description: line?.expand.article?.description ?? line?.expand.service?.description ?? "—",
            vatRate: line?.expand.article?.vatRate ?? line?.expand.service?.vatRate ?? 0,
            unitPrice: line?.expand.article?.unitPrice ?? line?.expand.service?.unitPrice ?? 0,
        } as LineInfos;
    }
}

export const estimatesLines = new EstimateLineCrud();