import { PocketbaseCrud } from '@common/database/pocketbase';
import type { ClientsResponse, EstimatesArticlesResponse, EstimatesResponse, EstimatesServicesResponse } from '@common/database/types.g';
import { EstimatesStatusOptions, Collections } from '@common/database/types.g';

type EstimateExpand = {
    client: ClientsResponse;
    services?: EstimatesServicesResponse[];
    articles?: EstimatesArticlesResponse[];
};

class EstimateCrud extends PocketbaseCrud<EstimateData> {
    constructor() {
        super(Collections.Estimates, ['reference'], ['client', 'services', 'articles']);
    }
}

export { EstimatesStatusOptions as EnumEstimateStatus };

export type EstimateData = EstimatesResponse<EstimateExpand>;

const estimatesArticles = new PocketbaseCrud<EstimatesArticlesResponse>(Collections.EstimatesArticles);
const estimatesServices = new PocketbaseCrud<EstimatesServicesResponse>(Collections.EstimatesServices);

export const Estimate = {
    totalHT(estimate: EstimateData): number {
        return estimate.expand.services?.reduce((sum, service) => sum + service.unitPrice * service.quantity, 0) ?? 0 +
            (estimate.expand.articles?.reduce((sum, article) => sum + article.unitPrice * article.quantity, 0) ?? 0);
    }, 
    totalTax(estimate: EstimateData): number {
        return estimate.expand.services?.reduce((sum, service) => sum + service.unitPrice * service.quantity * service.vatRate, 0) ?? 0 +
            (estimate.expand.articles?.reduce((sum, article) => sum + article.unitPrice * article.quantity * article.vatRate, 0) ?? 0);
    }, 
    totalTTC(estimate: EstimateData): number {
        return this.totalHT(estimate) + this.totalTax(estimate);
    }, 
    addArticle(estimate: EstimateData, article: EstimatesArticlesResponse, quantity: number) {

        // Create EstimateArticle if it doesn't exist yet
        if (estimate.articles.find(a => a.id === article.id) === undefined) {
            estimatesArticles.create({
                estimateId: estimate.id,
                articleId: article.id,
                quantity: 0
            });
        }


        if (estimate.expand.articles === undefined)
            estimate.expand.articles = [];

        const existing = estimate.expand.articles.find(l => l.id === article.id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            article.quantity = quantity;
            estimate.expand.articles.push(article);
        }
    }, 
    addService(estimate: EstimateData, service: EstimatesServicesResponse, quantity: number) {
        if (estimate.expand.services === undefined)
            estimate.expand.services = [];

        const existing = estimate.expand.services.find(l => l.id === service.id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            service.quantity = quantity;
            estimate.expand.services.push(service);
        }
    }, removeArticle(estimate: EstimateData, articleId: string) {
        if (estimate.expand.articles === undefined)
            return;
        estimate.expand.articles = estimate.expand.articles.filter(a => a.id !== articleId);
    }, removeService(estimate: EstimateData, serviceId: string) {
        if (estimate.expand.services === undefined)
            return;
        estimate.expand.services = estimate.expand.services.filter(s => s.id !== serviceId);
    }
};

export const estimates = new EstimateCrud();