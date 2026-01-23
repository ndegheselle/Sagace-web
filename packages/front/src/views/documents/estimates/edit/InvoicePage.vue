<script setup lang="ts">
import { api, Estimate, EstimateStatus } from "@/data/documents/estimates";
import EstimateStatusBadge from "@/views/documents/estimates/EstimateStatusBadge.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function print() {
    if (!props.estimate)
        return;

    props.estimate.status = EstimateStatus.Sent;
    window.open(`/documents/estimates/${props.estimate._id}/print`, '_blank');
    api.update(props.estimate._id, props.estimate);
}

function reject() {
    if (!props.estimate)
        return;
    props.estimate.status = EstimateStatus.Refused;
    api.update(props.estimate._id, props.estimate);
}

async function toInvoice() {
    if (!props.estimate)
        return;
    props.estimate.status = EstimateStatus.Accepted;
    const invoiceId = await api.toInvoice(props.estimate._id);
    router.push(`/documents/invoices/${invoiceId}/print`);

}

const props = defineProps({
    estimate: Estimate
});
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <RouterLink :to="{ path: `/documents/estimates/${props.estimate?._id}/items` }"><i
                        class="fa-solid fa-file-invoice"></i> Devis</RouterLink>
            </li>
            <li class="step step-primary">
                <RouterLink :to="{ path: `/documents/estimates/${props.estimate?._id}/client` }">
                    <div v-if="props.estimate?.client" class="indicator">
                        <span class="indicator-item text-success"><i class="fa-solid fa-check"></i></span>
                        <span><i class="fa-solid fa-user"></i> {{ props.estimate?.client.fullName }}</span>
                    </div>
                    <span v-else><i class="fa-solid fa-user"></i> Client</span>

                </RouterLink>
            </li>
            <li class="step step-primary">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>

        <div class="bg-base-200 rounded-box flex flex-col py-8 mt-4">
            <h1 class="text-xl font-bold text-center">Statut du devis</h1>
            <EstimateStatusBadge :status="estimate?.status" class="mx-auto mt-2" />
        </div>
        <div class="bg-base-200 rounded-box flex-1 flex flex-col mt-1">
            <h1 class="text-xl font-bold text-center mt-auto">Imprimer le devis</h1>
            <button class="btn btn-neutral mx-auto mt-2 mb-auto" @click="print"><i class="fa-solid fa-print"></i>
                Imprimer</button>
        </div>
        <div class="grid grid-cols-2 gap-1 mt-1">
            <div class="bg-base-200 rounded-box flex flex-col py-8">
                <h1 class="text-xl font-bold text-center">Rejeter le devis</h1>
                <button class="btn btn-error mx-auto mt-2" @click="reject"><i class="fa-solid fa-ban"></i>
                    Rejeter</button>
            </div>
            <div class="bg-base-200 rounded-box flex flex-col py-8">
                <h1 class="text-xl font-bold text-center">Convertir en facture</h1>
                <button class="btn btn-success mx-auto mt-2" @click="toInvoice"><i
                        class="fa-solid fa-file-invoice-dollar"></i> Créer une facture</button>
            </div>
        </div>


        <div class="w-full flex mt-1">
            <RouterLink :to="{ path: `/documents/estimates/${props.estimate?._id}/client` }" class="btn"><i
                    class="fa-solid fa-arrow-left"></i> Précédent</RouterLink>
        </div>
    </div>
</template>