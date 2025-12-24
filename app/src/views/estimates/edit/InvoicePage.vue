<script setup lang="ts">
import { Estimate } from "@/lib/api/estimate";
const props = defineProps({
    estimate: Estimate
});
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <RouterLink to="/estimates/new/items"><i class="fa-solid fa-file-invoice"></i> Devis</RouterLink>
            </li>
            <li class="step step-primary">
                <RouterLink to="/estimates/new/client"><i class="fa-solid fa-user"></i> Client</RouterLink>
            </li>
            <li class="step step-primary">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>

        <div class="w-full flex mt-1">
            <RouterLink :to="{ path: `/estimates/${props.estimate?.id}/client` }" class="btn"><i
                    class="fa-solid fa-arrow-left"></i> Précédent</RouterLink>
        </div>
    </div>
</template>