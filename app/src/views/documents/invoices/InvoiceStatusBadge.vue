<script setup lang="ts">
import { computed } from 'vue';
import { InvoiceStatus } from '@/lib/api/documents/invoices';

const props = defineProps<{
  status: InvoiceStatus;
}>();

const statusClassMap: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Draft]: 'badge-neutral',
  [InvoiceStatus.Issued]: 'badge-info',
  [InvoiceStatus.Paid]: 'badge-success',
  [InvoiceStatus.Overdue]: 'badge-warning',
  [InvoiceStatus.Cancelled]: 'badge-error',
};

const badgeClass = computed(() => statusClassMap[props.status]);

const statusLabelMap: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Draft]: 'Brouillon',
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