<script setup lang="ts">
import ClientSelection from '@/views/clients/ClientSelection.vue';
</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <ul class="steps">
            <li class="step step-primary">Préstations</li>
            <li class="step step-primary">Client</li>
            <li class="step">Facture</li>
        </ul>

        <h1 class="text-2xl font-bold text-center mt-4">Sélectionner un client</h1>
        <ClientSelection class="mt-4" />
        <div class="divider">OU</div>
        <div class="bg-base-200 rounded-box shadow-md text-center">
            <div class="max-w-md mx-auto my-10">
                <h1 class="text-2xl font-bold"><i class="fa-regular fa-user"></i> Créer un nouveau client</h1>
                <button class="btn btn-primary mt-4"><i class="fa-solid fa-plus"></i> Nouveau</button>
            </div>
        </div>
    </div>
</template>
