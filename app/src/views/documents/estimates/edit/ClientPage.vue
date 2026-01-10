<script setup lang="ts">
import ClientSelection from '@/views/clients/ClientSelection.vue';
import { Estimate } from "@/lib/api/documents/estimates";
import { useRouter } from "vue-router";
import { ref, useTemplateRef } from 'vue';
import { Client } from '@/lib/api/clients';
import { api as estimateApi } from '@/lib/api/documents/estimates';
import ClientModal from '@/views/clients/ClientModal.vue';

const router = useRouter();
const modalRef = useTemplateRef('modal');

function previous() {
    save();
    router.push(`/documents/estimates/${props.estimate?._id}/items`);
}

function next() {
    save();
    router.push(`/documents/estimates/${props.estimate?._id}/invoice`);
}

function save() {
    if (!props.estimate)
        return;

    props.estimate.clientId = selectedClient.value?._id;
    estimateApi.update(props.estimate._id, props.estimate);
}

async function create() {
    if (await modalRef.value?.show(new Client()) == true && modalRef.value?.client) {
        selectedClient.value = modalRef.value.client;
        next();
    }
}

const props = defineProps({
    estimate: Estimate,
    client: Client
});
const selectedClient = ref<Client | null>(props.client ?? null);
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <RouterLink :to="{ path: `/documents/estimates/${props.estimate?._id}/items` }"><i
                        class="fa-solid fa-file-invoice"></i> Devis</RouterLink>
            </li>
            <li class="step step-primary">
                <div v-if="selectedClient" class="indicator">
                    <span class="indicator-item text-success"><i class="fa-solid fa-check"></i></span>
                    <span><i class="fa-solid fa-user"></i> {{ selectedClient?.fullName }}</span>
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
            <ClientSelection class="mt-4 flex-1" :selected="selectedClient"
                @update:selected="value => selectedClient = value" />

            <div class="divider">OU</div>
            <div class="bg-base-200 rounded-box shadow-md text-center">
                <div class="max-w-md mx-auto my-10">
                    <h1 class="text-2xl font-bold"><i class="fa-regular fa-user"></i> Créer un nouveau client</h1>
                    <button class="btn btn-soft mt-4" @click="create"><i class="fa-solid fa-plus"></i> Nouveau</button>
                </div>
            </div>

        <div class="w-full flex mt-1">
            <button @click="previous" class="btn"><i class="fa-solid fa-arrow-left"></i>
                Précédent</button>
            <button @click="next" class="btn btn-primary ms-auto"><i class="fa-solid fa-arrow-right"></i>
                Suivant</button>
        </div>

        <ClientModal ref="modal" />
    </div>
</template>
