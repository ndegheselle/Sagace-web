<script setup lang="ts">
import { InvoiceStatus } from '@/lib/api/documents/invoices';
import { computed } from 'vue';

const props = defineProps<{
  status: InvoiceStatus;
}>();

const statusClassMap: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Issued]: 'badge-info',
  [InvoiceStatus.Paid]: 'badge-success',
  [InvoiceStatus.Overdue]: 'badge-warning',
  [InvoiceStatus.Cancelled]: 'badge-error',
};

const badgeClass = computed(() => statusClassMap[props.status]);

const statusLabelMap: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Issued]: 'Émise',
  [InvoiceStatus.Paid]: 'Payée',
  [InvoiceStatus.Overdue]: 'En retard',
  [InvoiceStatus.Cancelled]: 'Annulée',
};

const statusLabel = computed(() => statusLabelMap[props.status]);
</script>

<template>
  <span class="badge" :class="badgeClass">
    {{ statusLabel }}
  </span>
</template>