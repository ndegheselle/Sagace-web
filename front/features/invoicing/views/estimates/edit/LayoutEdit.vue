<script setup lang="ts">
import { useAlert } from '@common/composables/popups/alert';
import { type EstimateData, estimates } from '@features/invoicing/data/estimates';
import { ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const alert = useAlert();
const estimate = ref<EstimateData>();

watch(() => route.params.id, async (id) => {
    let estimateApi: EstimateData | null = null;
    if (id && typeof id == 'string') {
        estimateApi = await estimates.getById(id);
    }

    if (!estimateApi) {
        router.push('/invoicing/estimates');
        alert.error(`Aucun devis trouvé pour l'id [${id}].`);
        return;
    }

    estimate.value = estimateApi;
}, { immediate: true });
</script>

<template>
    <router-view :estimate="estimate" />
</template>