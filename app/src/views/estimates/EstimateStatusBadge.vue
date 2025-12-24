<script setup lang="ts">
import { computed } from 'vue';
import { EnumEstimateStatus } from '@/lib/api/estimate';

const props = defineProps<{
    status: EnumEstimateStatus
}>();

const badgeClass = computed(() => [
    'badge',
    props.status === EnumEstimateStatus.Draft
        ? 'badge-neutral'
        : props.status === EnumEstimateStatus.Sent
        ? 'badge-warning'
        : 'badge-success'
]);

const statusLabelMap: Record<EnumEstimateStatus, string> = {
    [EnumEstimateStatus.Draft]: 'Brouillon',
    [EnumEstimateStatus.Sent]: 'Envoyé',
    [EnumEstimateStatus.Accepted]: 'Accepté'
}
const statusLabel = computed(() => statusLabelMap[props.status]);
</script>

<template>
    <span :class="badgeClass">
        {{ statusLabel }}
    </span>
</template>