<script setup lang="ts">

</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <ul class="steps">
            <li class="step step-primary">Préstations</li>
            <li class="step"><RouterLink to="/estimates/new/client">
                <i class="fa-solid fa-user"></i> Client</RouterLink></li>
            <li class="step">Facture</li>
        </ul>
    </div>
</template>