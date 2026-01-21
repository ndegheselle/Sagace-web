<script setup lang="ts">

</script>

<template>
    <div class="stats grid grid-cols-2 border-base-300 border bg-base-200">
        <div class="stat">
            <div class="stat-figure text-secondary">
                <i class="fa-solid fa-hourglass-half text-2xl"></i>
            </div>
            <div class="stat-title">Émise</div>
            <div class="stat-value">4,200</div>
            <div class="stat-desc">En attente de payement</div>
        </div>
        <div class="stat">
            <div class="stat-figure text-error">
                <i class="fa-solid fa-circle-exclamation text-2xl"></i>
            </div>
            <div class="stat-title">En retard</div>
            <div class="stat-value text-error">4,200</div>
            <div class="stat-desc">Client à relancé</div>
        </div>
    </div>
</template>
