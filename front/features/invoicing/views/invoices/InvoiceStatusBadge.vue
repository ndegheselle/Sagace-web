<script setup lang="ts">
import { EnumInvoiceStatus } from '@features/invoicing/data/invoices';
import { computed } from 'vue';

const props = defineProps<{
  status: EnumInvoiceStatus;
}>();

const statusClassMap: Record<EnumInvoiceStatus, string> = {
  [EnumInvoiceStatus.ISSUED]: 'badge-info',
  [EnumInvoiceStatus.PAID]: 'badge-success',
  [EnumInvoiceStatus.OVERDUE]: 'badge-warning',
  [EnumInvoiceStatus.CANCELLED]: 'badge-error',
};

const badgeClass = computed(() => statusClassMap[props.status]);

const statusLabelMap: Record<EnumInvoiceStatus, string> = {
  [EnumInvoiceStatus.ISSUED]: 'Émise',
  [EnumInvoiceStatus.PAID]: 'Payée',
  [EnumInvoiceStatus.OVERDUE]: 'En retard',
  [EnumInvoiceStatus.CANCELLED]: 'Annulée',
};

const statusLabel = computed(() => statusLabelMap[props.status]);
</script>

<template>
  <span class="badge" :class="badgeClass">
    {{ statusLabel }}
  </span>
</template>