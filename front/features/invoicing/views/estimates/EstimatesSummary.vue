<script setup lang="ts">
import { api } from '@/data/documents/estimates';
import { onMounted, ref } from 'vue';

const countDraft = ref(0);
const countSent = ref(0);

onMounted(async () => {
  countDraft.value = await api.countDraft();
  countSent.value = await api.countSent();
});
</script>

<template>
    <div class="stats w-full stats-vertical lg:stats-horizontal border-base-300 border bg-base-200 rounded-sm">
        <div class="stat">
            <div class="stat-figure text-secondary">
                <i class="fa-regular fa-circle-question text-4xl"></i>
            </div>
            <div class="stat-title">Devis en brouillons</div>
            <div class="stat-value">{{ countDraft }}</div>
            <div class="stat-desc">A finaliser</div>
        </div>
        <div class="stat">
            <div class="stat-figure text-primary">
                <i class="fa-regular fa-paper-plane text-3xl"></i>
            </div>
            <div class="stat-title">Devis envoyés</div>
            <div class="stat-value">{{ countSent }}</div>
            <div class="stat-desc">A valider par le client</div>
        </div>
    </div>
</template>
