<script setup lang="ts">
import EstimatesSummary from '@/views/documents/estimates/EstimatesSummary.vue';
import InvoicesSummary from '@/views/documents/invoices/InvoicesSummary.vue';
</script>

<template>
  <div class="container mx-auto flex flex-col my-2">
    <div class="grid lg:grid-cols-2 gap-2">

      <EstimatesSummary />
      <InvoicesSummary />
    </div>
  </div>
</template>