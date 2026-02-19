<script setup lang="ts">
import InvoiceStatusBadge from '@features/invoicing/views/invoices/InvoiceStatusBadge.vue';
import TablePaginatedSearch from '@common/components/data/TablePaginatedSearch.vue';
import { formatDate } from '@common/utils/date';
import type { PaginationOptions } from '@common/database/crud';
import { usePageActions } from '@common/composables/data/pageActions';
import { Invoice, invoices, type InvoiceData } from '@features/invoicing/data/invoices';

const { list, total, refresh } = usePageActions(invoices);

function print(invoice: InvoiceData) {
    window.open(`/invoicing/invoices/${invoice.id}/print`, '_blank');
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-file-invoice-dollar"></i>
            Factures
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1" ref="table" @refresh="refresh" :total="total" :items="list">
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
                <td>{{ invoice.number || '—' }}</td>
                <td>
                    {{ invoice.expand.client?.firstName }} {{ invoice.expand.client?.lastName }}
                </td>
                <td class="text-right">
                    {{ invoice.lines.length }}
                </td>
                <td class="text-right">
                    {{ Invoice.totalTTC(invoice).toFixed(2) }} €
                </td>
                <td class="text-right">
                    <InvoiceStatusBadge :status="invoice.status" />
                </td>
                <td class="text-right">
                    {{ formatDate(invoice.dueDate) }}
                </td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-xs">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
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