<script setup lang="ts">
import { Estimate } from "@/lib/api/document/estimate";

function print()
{
    window.open(`/documents/estimates/${props.estimate?.id}/print`, '_blank');
}

const props = defineProps({
    estimate: Estimate
});
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <RouterLink :to="{ path: `/documents/estimates/${props.estimate?.id}/items` }"><i class="fa-solid fa-file-invoice"></i> Devis</RouterLink>
            </li>
            <li class="step step-primary">
                <RouterLink :to="{ path: `/documents/estimates/${props.estimate?.id}/client` }">
                    <div v-if="props.estimate?.client" class="indicator">
                        <span class="indicator-item text-success"><i class="fa-solid fa-check"></i></span>
                        <span><i class="fa-solid fa-user"></i> {{ props.estimate.client.fullName }}</span>
                    </div>
                    <span v-else><i class="fa-solid fa-user"></i> Client</span>

                </RouterLink>
            </li>
            <li class="step step-primary">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>

        <section>
            <button class="btn" @click="print">Imprimer</button>
            <!-- Devis PDF déjà généré (avec date) -->
            <!-- Facture PDF déjà généré (avec date) -->
            <!-- Possibilité de changer le status ? Ou  -->
        </section>

        <div class="w-full flex mt-1">
            <RouterLink :to="{ path: `/documents/estimates/${props.estimate?.id}/client` }" class="btn"><i
                    class="fa-solid fa-arrow-left"></i> Précédent</RouterLink>
        </div>
    </div>
</template>