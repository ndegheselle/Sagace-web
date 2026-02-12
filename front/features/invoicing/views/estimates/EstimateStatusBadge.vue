<script setup lang="ts">
import { EstimatesStatusOptions } from '@common/database/types.g';
import { computed } from 'vue';

const props = defineProps<{
    status: EstimatesStatusOptions | undefined
}>();

const statusClassMap: Record<EstimatesStatusOptions, string> = {
    [EstimatesStatusOptions.TEMPLATE]: 'badge-primary',
    [EstimatesStatusOptions.DRAFT]: 'badge-neutral',
    [EstimatesStatusOptions.SENT]: 'badge-warning',
    [EstimatesStatusOptions.ACCEPTED]: 'badge-success',
    [EstimatesStatusOptions.REFUSED]: 'badge-error'
}
const badgeClass = computed(() => statusClassMap[props.status || EstimatesStatusOptions.DRAFT]);

const statusLabelMap: Record<EstimatesStatusOptions, string> = {
    [EstimatesStatusOptions.TEMPLATE]: 'Modèle',
    [EstimatesStatusOptions.DRAFT]: 'Brouillon',
    [EstimatesStatusOptions.SENT]: 'Imprimé',
    [EstimatesStatusOptions.ACCEPTED]: 'Accepté',
    [EstimatesStatusOptions.REFUSED]: 'Refusé'
}
const statusLabel = computed(() => statusLabelMap[props.status || EstimatesStatusOptions.DRAFT]);
</script>

<template>
    <span class="badge" :class="badgeClass">
        {{ statusLabel }}
    </span>
</template>