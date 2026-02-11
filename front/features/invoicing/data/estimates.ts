import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ClientsResponse, EstimatesArticlesResponse, EstimatesResponse, EstimatesServicesResponse } from '@common/database/types.g';
import { useRouter } from 'vue-router';

type EstimateExpand = {
    client: ClientsResponse;
    services: EstimatesArticlesResponse[];
    articles: EstimatesServicesResponse[];
};

export type EstimateData = EstimatesResponse<EstimateExpand>;

export function totalHT(estimate: EstimateData): number {
    return estimate.expand.services.reduce((sum, service) => sum + service.unitPrice * service.quantity, 0) +
        estimate.expand.articles.reduce((sum, article) => sum + article.unitPrice * article.quantity, 0);
}

export function totalTTC(estimate: EstimateData): number {
    return estimate.expand.services.reduce((sum, service) => sum + service.unitPrice * service.quantity * service.vatRate, 0) +
        estimate.expand.articles.reduce((sum, article) => sum + article.unitPrice * article.quantity * article.vatRate, 0);
}

class EstimateCrud extends PocketbaseCrud<EstimateData> {
    constructor() {
        super('estimates', ['reference'], ['client', 'services', 'articles']);
    }
}

export const estimates = new EstimateCrud();