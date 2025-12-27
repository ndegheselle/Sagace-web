<script setup lang="ts">
import { computed } from 'vue';
import { EnumEstimateStatus } from '@/lib/api/document/estimate';

const props = defineProps<{
    status: EnumEstimateStatus | undefined
}>();

const statusClassMap: Record<EnumEstimateStatus, string> = {
    [EnumEstimateStatus.Template]: 'badge-primary',
    [EnumEstimateStatus.Draft]: 'badge-neutral',
    [EnumEstimateStatus.Sent]: 'badge-warning',
    [EnumEstimateStatus.Accepted]: 'badge-success',
    [EnumEstimateStatus.Refused]: 'badge-error'
}
const badgeClass = computed(() => statusClassMap[props.status || EnumEstimateStatus.Draft]);

const statusLabelMap: Record<EnumEstimateStatus, string> = {
    [EnumEstimateStatus.Template]: 'Modèle',
    [EnumEstimateStatus.Draft]: 'Brouillon',
    [EnumEstimateStatus.Sent]: 'Imprimé',
    [EnumEstimateStatus.Accepted]: 'Accepté',
    [EnumEstimateStatus.Refused]: 'Refusé'
}
const statusLabel = computed(() => statusLabelMap[props.status || EnumEstimateStatus.Draft]);
</script>

<template>
    <span class="badge" :class="badgeClass">
        {{ statusLabel }}
    </span>
</template>