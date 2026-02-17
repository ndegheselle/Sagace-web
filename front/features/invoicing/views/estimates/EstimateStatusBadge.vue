<script setup lang="ts">
import { EnumEstimateStatus } from '@features/invoicing/data/estimates';
import { computed } from 'vue';

const props = defineProps<{
    status: EnumEstimateStatus | undefined
}>();

const statusClassMap: Record<EnumEstimateStatus, string> = {
    [EnumEstimateStatus.TEMPLATE]: 'badge-primary',
    [EnumEstimateStatus.DRAFT]: 'badge-neutral',
    [EnumEstimateStatus.SENT]: 'badge-warning',
    [EnumEstimateStatus.ACCEPTED]: 'badge-success',
    [EnumEstimateStatus.REFUSED]: 'badge-error'
}
const badgeClass = computed(() => statusClassMap[props.status || EnumEstimateStatus.DRAFT]);

const statusLabelMap: Record<EnumEstimateStatus, string> = {
    [EnumEstimateStatus.TEMPLATE]: 'Modèle',
    [EnumEstimateStatus.DRAFT]: 'Brouillon',
    [EnumEstimateStatus.SENT]: 'Envoyé',
    [EnumEstimateStatus.ACCEPTED]: 'Accepté',
    [EnumEstimateStatus.REFUSED]: 'Refusé'
}
const statusLabel = computed(() => statusLabelMap[props.status || EnumEstimateStatus.DRAFT]);
</script>

<template>
    <span class="badge" :class="badgeClass">
        {{ statusLabel }}
    </span>
</template>