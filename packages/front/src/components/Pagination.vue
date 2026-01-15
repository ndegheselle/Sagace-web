<script setup lang="ts">
import { computed, watch } from 'vue';

const capacityOptions = [5, 10, 25, 50, 100];

const page = defineModel<number>('page', { default: 1 });
const total = defineModel<number>('total', { default: 25 });
const capacity = defineModel<number>('capacity', { default: 25 });

const emit = defineEmits<{
    (e: 'change', payload: { page: number; capacity: number }): void;
}>();

const totalPages = computed(() =>
    Math.max(1, Math.ceil(total.value / capacity.value))
);

const firstElement = computed(() => {
  return (page.value - 1) * capacity.value + 1;
});
const lastElement = computed(() => {
  return Math.min(page.value * capacity.value, total.value);
});

watch(capacity, () => {
    if (page.value > totalPages.value) {
        page.value = totalPages.value;
    }
});

watch([page, capacity], () => {
    emit('change', {
        page: page.value,
        capacity: capacity.value,
    });
});
</script>


<template>
    <div class="flex w-full">
        <div class="join">
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page <= 1 }" aria-label="Première page"
                @click="page = 1">
                <i class="fa-solid fa-backward-step"></i>
            </button>
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page <= 1 }" aria-label="Page précédente"
                @click="page = page - 1">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span class="join-item btn btn-sm">
                {{ page }} / {{ totalPages }}
            </span>
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page >= totalPages }"
                aria-label="Page suivante" @click="page = page + 1">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': page >= totalPages }"
                aria-label="Dernière page" @click="page = totalPages">
                <i class="fa-solid fa-forward-step"></i>
            </button>
        </div>


        <span class="ms-auto opacity-50 text-sm my-auto">{{ firstElement }} - {{ lastElement }} de {{ total }}</span>
        <select v-model="capacity" class="select w-18 select-sm ms-2">
            <option v-for="option in capacityOptions" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>