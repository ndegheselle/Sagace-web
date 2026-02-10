import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ClientsResponse, EstimatesArticlesResponse, EstimatesResponse, EstimatesServicesResponse } from '@common/database/types.g';

export type EstimateExpand = {
    client: ClientsResponse;
    services: EstimatesArticlesResponse[];
    articles: EstimatesServicesResponse[];
};

export function totalHT(estimate: EstimatesResponse<EstimateExpand>): number {
    return estimate.expand.services.reduce((sum, service) => sum + service.unitPrice * service.quantity, 0) +
        estimate.expand.articles.reduce((sum, article) => sum + article.unitPrice * article.quantity, 0);
}

export function totalTTC(estimate: EstimatesResponse<EstimateExpand>): number {
    return estimate.expand.services.reduce((sum, service) => sum + service.unitPrice * service.quantity * service.vatRate, 0) +
        estimate.expand.articles.reduce((sum, article) => sum + article.unitPrice * article.quantity * article.vatRate, 0);
}

export const estimates = new PocketbaseCrud<EstimatesResponse<EstimateExpand>>('estimates', ['reference'], ['client', 'services', 'articles']);