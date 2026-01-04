<script setup lang="ts">
import { api, Invoice } from '@/lib/api/documents/invoices';
import type { PaginationOptions } from '@/lib/base/paginated';
import InvoiceStatusBadge from '@/views/documents/invoices/InvoiceStatusBadge.vue';
import TablePaginatedSearch from '@/components/data/TablePaginatedSearch.vue';
import { ref } from 'vue';

const total = ref<number>(0);
const invoices = ref<Invoice[]>([]);

function print(invoice: Invoice) {
    window.open(`/documents/invoices/${invoice.id}/print`, '_blank');
}

async function refresh(search: string, pagination: PaginationOptions) {
    const result = await api.search(search, pagination);
    invoices.value = result.data || [];
    total.value = result.total || 0;
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-file-invoice-dollar"></i>
            Factures
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1" ref="table" @refresh="refresh" :total="total" :items="invoices">
            <template #header>
                <th>Numéro</th>
                <th>Client</th>
                <th class="text-right">Éléments</th>
                <th class="text-right">Total TTC</th>
                <th class="text-right">Statut</th>
                <th class="text-right">Échéance</th>
                <th class="text-right">Actions</th>
            </template>
            <template #row="{ item: invoice }">
                <td>{{ invoice.invoiceNumber || '—' }}</td>
                <td>
                    {{ invoice.client?.firstName }}
                    {{ invoice.client?.lastName || '' }}
                </td>
                <td class="text-right">
                    {{ invoice.lines.length }}
                </td>
                <td class="text-right">
                    {{ invoice.totalTTC.toFixed(2) }} €
                </td>
                <td class="text-right">
                    <InvoiceStatusBadge :status="invoice.status" />
                </td>
                <td class="text-right">
                    {{ invoice.dueDate?.toLocaleDateString() || '—' }}
                </td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-sm">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <a href="#" @click.prevent="print(invoice)">
                                    <i class="fa-solid fa-print"></i>
                                    Imprimer
                                </a>
                            </li>
                        </ul>
                    </details>
                </td>
            </template>
        </TablePaginatedSearch>
    </div>
</template>