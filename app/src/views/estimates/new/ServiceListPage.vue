<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Client, api } from '@/lib/api/client';

const route = useRoute();
const router = useRouter();
const client = ref<Client | null>(null);

watch(
    () => route.query.clientId,
    async (clientId) => {

        let clientApi = null;
        if (clientId && typeof clientId === 'string')
            clientApi = await api.getById(clientId);

        // Go back to client selection
        if (!clientApi) {
            router.replace('/estimates/new/client');
            return;
        }

        client.value = clientApi;
    },
    { immediate: true } // <-- runs on initial load
);
</script>

<template>
    <span>{{ client?.fullName }}</span>
</template>
