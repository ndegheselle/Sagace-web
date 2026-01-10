<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { Estimate, api } from '@/lib/api/documents/estimates';
import { Client, api as clientApi } from '@/lib/api/clients';
import { useAlert } from '@/composables/popups/alert';

const route = useRoute();
const router = useRouter();
const alert = useAlert();
const estimate = ref<Estimate>();
const client = ref<Client>();

watch(() => route.params.id, async (id) => {
    let estimateApi: Estimate | null = null;
    if (id && typeof id == 'string') {
        estimateApi = await api.getById(id);
    }

    if (!estimateApi) {
        router.push('/documents/estimates');
        alert.error(`Aucun devis trouvé pour l'id [${id}].`);
        return;
    }

    estimate.value = estimateApi;
    if (estimateApi.clientId) {
        const clientApiData = await clientApi.getById(estimateApi.clientId);
        if (clientApiData) {
            client.value = clientApiData;
        }
    }
}, { immediate: true });

</script>

<template>
    <router-view :estimate="estimate" :client="client" />
</template>