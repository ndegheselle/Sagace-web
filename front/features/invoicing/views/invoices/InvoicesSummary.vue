<script setup lang="ts">
import { api } from '@/data/documents/invoices';
import { onMounted, ref } from 'vue';

const countIssued = ref(0);
const countoverdue = ref(0);

onMounted(async () => {
  countIssued.value = await api.countIssued();
  countoverdue.value = await api.countOverdue();
});
</script>

<template>
    <div class="stats w-full stats-vertical lg:stats-horizontal border-base-300 border bg-base-200">
        <div class="stat">
            <div class="stat-figure text-secondary text-4xl"><i class="fa-regular fa-hourglass"></i>
            </div>
            <div class="stat-title">Factures émise</div>
            <div class="stat-value">{{ countIssued }}</div>
            <div class="stat-desc">En attente de payement</div>
        </div>
        <div class="stat">
            <div class="stat-figure text-error text-4xl">
                <i class="fa-solid fa-file-circle-exclamation"></i>
            </div>
            <div class="stat-title">Factures en retard</div>
            <div class="stat-value text-error">{{ countoverdue }}</div>
            <div class="stat-desc">Client à relancé</div>
        </div>
    </div>
</template>
