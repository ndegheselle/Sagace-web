<script setup lang="ts">
import EstimatesSummary from '@/views/documents/estimates/EstimatesSummary.vue';
import InvoicesSummary from '@/views/documents/invoices/InvoicesSummary.vue';
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <div class="grid lg:grid-cols-2 gap-2">
            <div>
                <h1 class="text-heading opacity-50">
                    <i class="fa-solid fa-file-invoice"></i>
                    Devis
                </h1>
                <EstimatesSummary />
            </div>
            <div>
                <h1 class="text-heading opacity-50">
                    <i class="fa-solid fa-file-invoice-dollar"></i>
                    Factures
                </h1>
                <InvoicesSummary />
            </div>
        </div>
        <h1 class="text-heading opacity-50">
            <i class="fa-solid fa-file-invoice"></i>
            Articles
        </h1>
    </div>
</template>