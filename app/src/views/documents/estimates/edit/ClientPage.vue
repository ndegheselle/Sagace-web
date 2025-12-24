<script setup lang="ts">
import ClientSelection from '@/views/clients/ClientSelection.vue';
import { Estimate } from "@/lib/api/document/estimate";

const props = defineProps({
  estimate: Estimate
});
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <RouterLink to="/documents/estimates/new/items"><i class="fa-solid fa-file-invoice"></i> Devis</RouterLink>
            </li>
            <li class="step step-primary">
                <div v-if="props.estimate?.client" class="indicator">
                    <span class="indicator-item text-success"><i class="fa-solid fa-check"></i></span>
                    <span><i class="fa-solid fa-user"></i> {{ props.estimate.client.fullName }}</span>
                </div>
                <div v-else>
                    <span><i class="fa-solid fa-user"></i> Client</span>
                </div>
            </li>
            <li class="step">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>

        <h1 class="text-2xl font-bold text-center mt-4">Sélectionner un client</h1>
        <ClientSelection class="mt-4" />
        <div class="divider">OU</div>
        <div class="bg-base-200 rounded-box shadow-md text-center">
            <div class="max-w-md mx-auto my-10">
                <h1 class="text-2xl font-bold"><i class="fa-regular fa-user"></i> Créer un nouveau client</h1>
                <button class="btn btn-soft mt-4"><i class="fa-solid fa-plus"></i> Nouveau</button>
            </div>
        </div>

        <div class="w-full flex mt-1">
            <RouterLink :to="{ path: `/documents/estimates/${props.estimate?.id}/items` }" class="btn"><i class="fa-solid fa-arrow-left"></i> Précédent</RouterLink>
            <RouterLink :to="{ path: `/documents/estimates/${props.estimate?.id}/invoice` }" class="btn btn-primary ms-auto"><i class="fa-solid fa-arrow-right"></i> Suivant</RouterLink>
        </div>
    </div>
</template>
