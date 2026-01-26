<script setup lang="ts">

</script>

<template>
    <div class="stats w-full stats-vertical lg:stats-horizontal border-base-300 border bg-base-200">
        <div class="stat">
            <div class="stat-figure text-secondary text-4xl"><i class="fa-regular fa-hourglass"></i>
            </div>
            <div class="stat-title">Émise</div>
            <div class="stat-value">4,200</div>
            <div class="stat-desc">En attente de payement</div>
        </div>
        <div class="stat">
            <div class="stat-figure text-error text-4xl">
                <i class="fa-solid fa-file-circle-exclamation"></i>
            </div>
            <div class="stat-title">En retard</div>
            <div class="stat-value text-error">4,200</div>
            <div class="stat-desc">Client à relancé</div>
        </div>
    </div>
</template>
