<script setup lang="ts">
import { EstimateStatus } from '@/data/documents/estimates';
import { computed } from 'vue';

const props = defineProps<{
    status: EstimateStatus | undefined
}>();

const statusClassMap: Record<EstimateStatus, string> = {
    [EstimateStatus.Template]: 'badge-primary',
    [EstimateStatus.Draft]: 'badge-neutral',
    [EstimateStatus.Sent]: 'badge-warning',
    [EstimateStatus.Accepted]: 'badge-success',
    [EstimateStatus.Refused]: 'badge-error'
}
const badgeClass = computed(() => statusClassMap[props.status || EstimateStatus.Draft]);

const statusLabelMap: Record<EstimateStatus, string> = {
    [EstimateStatus.Template]: 'Modèle',
    [EstimateStatus.Draft]: 'Brouillon',
    [EstimateStatus.Sent]: 'Imprimé',
    [EstimateStatus.Accepted]: 'Accepté',
    [EstimateStatus.Refused]: 'Refusé'
}
const statusLabel = computed(() => statusLabelMap[props.status || EstimateStatus.Draft]);
</script>

<template>
    <span class="badge" :class="badgeClass">
        {{ statusLabel }}
    </span>
</template>