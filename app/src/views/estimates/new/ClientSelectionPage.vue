<script setup lang="ts">
import ClientSelection from '@/views/clients/ClientSelection.vue';
</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <RouterLink to="/estimates/new/services"><i class="fa-solid fa-file-invoice"></i> Devis</RouterLink>
            </li>
            <li class="step step-primary">
                <span><i class="fa-solid fa-user"></i> Client</span>
            </li>
            <li class="step">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>

        <div class="divider mx-auto w-1/2"></div>

        <h1 class="text-2xl font-bold text-center mt-4">Sélectionner un client</h1>
        <ClientSelection class="mt-4" />
        <div class="divider">OU</div>
        <div class="bg-base-200 rounded-box shadow-md text-center">
            <div class="max-w-md mx-auto my-10">
                <h1 class="text-2xl font-bold"><i class="fa-regular fa-user"></i> Créer un nouveau client</h1>
                <button class="btn btn-primary mt-4"><i class="fa-solid fa-plus"></i> Nouveau</button>
            </div>
        </div>

        <div class="w-full flex mt-2">
            <RouterLink to="/estimates/new/services" class="btn"><i class="fa-solid fa-arrow-left"></i> Précédent</RouterLink>
            <RouterLink to="/estimates/new/client" class="btn btn-primary ms-auto"><i class="fa-solid fa-arrow-right"></i> Suivant</RouterLink>
        </div>
    </div>
</template>
