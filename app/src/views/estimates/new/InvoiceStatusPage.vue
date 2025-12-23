<script setup lang="ts">

</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <RouterLink to="/estimates/new/services"><i class="fa-solid fa-file-invoice"></i> Devis</RouterLink>
            </li>
            <li class="step step-primary">
                <RouterLink to="/estimates/new/client"><i class="fa-solid fa-user"></i> Client</RouterLink>
            </li>
            <li class="step">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>
    </div>
</template>