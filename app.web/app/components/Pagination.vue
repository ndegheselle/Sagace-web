<script setup lang="ts">
import { computed } from 'vue';
const capacityOptions = [5, 10, 25, 50, 100];

const page = defineModel<number>('page', { default: 1 });
const total = defineModel<number>('total', { default: 25 });
const capacity = defineModel<number>('capacity', { default: 25 });

const totalPages = computed(() => Math.ceil(total.value / capacity.value));
</script>

<template>
    <div class="flex w-full mt-1">
        <div class="join">
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page <= 1 }" aria-label="Première page"
                @click="page = 1">
                <i class="fa-solid fa-backward-step"></i>
            </button>
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page <= 1 }" aria-label="Page précédente"
                @click="page = page - 1">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span class="join-item px-2 opacity-50 py-1">
                {{ page }} / {{ totalPages }}
            </span>
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page >= totalPages }"
                aria-label="Page suivante" @click="page = page + 1">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page >= totalPages }"
                @click="page = totalPages" aria-label="Dernière page">
                <i class="fa-solid fa-forward-step"></i>
            </button>
        </div>
        <select v-model="capacity" class="select w-18 ms-auto select-sm">
            <option v-for="option in capacityOptions" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>