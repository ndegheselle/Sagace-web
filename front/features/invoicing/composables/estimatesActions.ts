import { usePageActions } from '@common/composables/data/pageActions';
import { estimates, type EstimateData } from '@features/invoicing/data/estimates';
import { useRouter } from 'vue-router';

export function useEstimatesActions() {

    const router = useRouter();
    const { list, total, remove, refresh } = usePageActions(estimates);

    async function createAndNavigate(clientId: string) {
        const estimate = await estimates.create({ client: clientId } as EstimateData);
        router.push(`/invoicing/estimates/${estimate.id}/items`);
    }

    function navigateToEdit(estimate: EstimateData) {
        router.push(`/invoicing/estimates/${estimate.id}/items`);
    }

    return {
        list,
        total,
        remove,
        refresh,
        createAndNavigate,
        navigateToEdit,
    };
}