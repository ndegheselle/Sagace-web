import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ClientsResponse, EstimatesResponse } from '@common/database/types.g';
import { Collections, EstimatesStatusOptions } from '@common/database/types.g';
import { estimatesLines, EstimateLine, type EstimateLineData } from '@features/invoicing/data/estimatesLine';
import type { ArticleData } from '@features/stock/data/articles';
import type { ServiceData } from '@features/stock/data/services';

type EstimateExpand = {
    client: ClientsResponse;
    lines?: EstimateLineData[];
};

export { EstimatesStatusOptions as EnumEstimateStatus };

export type EstimateData = EstimatesResponse<EstimateExpand>;

class EstimateCrud extends PocketbaseCrud<EstimateData> {
    constructor() {
        super(Collections.Estimates, ['reference'], ['client', 'lines.article', 'lines.service']);
    }

    async addArticle(estimateId: string, article: ArticleData, quantity: number) : Promise<EstimateLineData> 
    {
        let line = await estimatesLines.getByParentAndItem(estimateId, article.id);
        if (line) {
            line.quantity += quantity;
            await estimatesLines.update(line.id, { quantity: line.quantity });
        }
        else {
            line = await estimatesLines.create({ article: article.id, estimate: estimateId, quantity: quantity } as EstimateLineData);
            await this.collection.update(estimateId, { "lines+": line.id });
            line.expand.article = article;
        }
        return line;
    }

    async addService(estimateId: string, service: ServiceData, quantity: number) : Promise<EstimateLineData>
    {
        let line = await estimatesLines.getByParentAndItem(estimateId, service.id);
        if (line) {
            line.quantity += quantity;
            await estimatesLines.update(line.id, { quantity: line.quantity });
        }
        else {
            line = await estimatesLines.create({ service: service.id, estimate: estimateId, quantity: quantity } as EstimateLineData);
            await this.collection.update(estimateId, { "lines+": line.id });
            line.expand.service = service;
        }
        return line;
    }

    async removeLine(estimateId: string, lineId: string)
    {
        await this.collection.update(estimateId, { "lines-": lineId });
        await estimatesLines.delete(lineId);
    }
}

export const Estimate = {
    totalHT(estimate?: EstimateData): number {
        if (!estimate)
            return 0;

        return estimate.expand.lines?.reduce((sum, line) => sum + EstimateLine.totalHT(line), 0) ?? 0;
    },
    totalTax(estimate?: EstimateData): number {
        if (!estimate)
            return 0;

        return estimate.expand.lines?.reduce((sum, line) => sum + EstimateLine.totalTax(line), 0) ?? 0;
    },
    totalTTC(estimate?: EstimateData): number {
        return this.totalHT(estimate) + this.totalTax(estimate);
    }
};

export const estimates = new EstimateCrud();