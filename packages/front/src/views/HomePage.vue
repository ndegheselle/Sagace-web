<script setup lang="ts">
import EstimatesSummary from '@/views/documents/estimates/EstimatesSummary.vue';
import InvoicesSummary from '@/views/documents/invoices/InvoicesSummary.vue';

import { Estimate, api as estimatesApi } from '@/data/documents/estimates';
import { useRouter } from 'vue-router';

const router = useRouter();

async function createEstimate() {
    const id = await estimatesApi.create(new Estimate());
    router.push(`/documents/estimates/${id}/items`);
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <div class="hero rounded-box bg-base-200 py-32 border-base-300 border">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Où commencer ?</h1>
                    <p class="py-6">
                        Créer un client ou un devis, ajouter des articles et services.
                    </p>
                    <RouterLink class="btn btn-neutral mt-1" to="/clients/new"><i class="fa-solid fa-users"></i> Ajouter un client</RouterLink>
                    <button class="btn btn-neutral ms-1 mt-1" @click="createEstimate"><i class="fa-solid fa-file-invoice"></i> Créer un
                        devis</button>
                </div>
            </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-2 mt-2">
            <div>
                <EstimatesSummary />
            </div>
            <div>
                <InvoicesSummary />
            </div>
        </div>
    </div>
</template>