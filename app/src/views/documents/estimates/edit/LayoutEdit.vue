<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { Estimate, api } from '@/lib/api/documents/estimates';
import { useAlert } from '@/composables/popups/alert';

const route = useRoute();
const router = useRouter();
const alert = useAlert();
const estimate = ref<Estimate>();

watch(() => route.params.id, async (id) => {
    let estimateApi: Estimate | null = null;
    if (id && typeof id == 'string') {
        estimateApi = await api.getById(id);
    }

    if (!estimateApi)
    {
        router.push('/documents/estimates');
        alert.error(`Aucun devis trouvé pour l'id [${id}].`);
        return;
    }

    estimate.value = estimateApi;
}, { immediate: true });

</script>

<template>
    <router-view :estimate="estimate" />
</template>