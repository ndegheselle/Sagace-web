<script setup lang="ts">
import { computed } from 'vue';
import { EnumEstimateStatus } from '@/lib/api/document/estimate';

const props = defineProps<{
    status: EnumEstimateStatus
}>();

const statusClassMap: Record<EnumEstimateStatus, string> = {
    [EnumEstimateStatus.Draft]: 'badge-neutral',
    [EnumEstimateStatus.Sent]: 'badge-warning',
    [EnumEstimateStatus.Accepted]: 'badge-success',
    [EnumEstimateStatus.Refused]: 'badge-error'
}
const badgeClass = computed(() => statusClassMap[props.status]);

const statusLabelMap: Record<EnumEstimateStatus, string> = {
    [EnumEstimateStatus.Draft]: 'Brouillon',
    [EnumEstimateStatus.Sent]: 'Envoyé',
    [EnumEstimateStatus.Accepted]: 'Accepté',
    [EnumEstimateStatus.Refused]: 'Refusé'
}
const statusLabel = computed(() => statusLabelMap[props.status]);
</script>

<template>
    <span class="badge" :class="badgeClass">
        {{ statusLabel }}
    </span>
</template>