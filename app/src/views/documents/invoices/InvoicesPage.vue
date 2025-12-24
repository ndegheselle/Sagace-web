<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useConfirmation } from '@/composables/popups/confirmation';
import { api, Invoice } from '@/lib/api/document/invoice';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import InvoiceStatusBadge from '@/views/documents/invoices/InvoiceStatusBadge.vue';
import { debounce } from '@/lib/base/debounce';

let search = '';
const confirmation = useConfirmation();
const router = useRouter();

const invoices = ref<Invoice[]>([]);
const total = ref(0);

const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 10,
});

async function load() {
    const result = await api.search(search, pagination);
    invoices.value = result.data || [];
    total.value = result.total || 0;
}

async function remove(invoice: Invoice) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer la facture <b>${invoice.invoiceNumber}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning'
    );

    if (!confirmed) return;

    await api.delete(invoice.id);
    await load();
}

async function create() {
    const id = await api.create(new Invoice());
    router.push(`/invoices/${id}/items`);
}

const debouncedLoad = debounce(load, 300);
load();
</script>
<template>
    <div class="container mx-auto flex flex-col my-2">
        <!-- Header -->
        <div class="flex">
            <h1 class="text-heading text-2xl">
                <i class="fa-solid fa-file-invoice-dollar"></i>
                Factures
            </h1>

            <div class="ms-auto my-auto flex">
                <label class="input input-sm ms-auto">
                    <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                    <input v-model="search" type="search" placeholder="Recherche" @input="debouncedLoad" />
                </label>

                <button class="btn btn-sm ms-1" @click="create">
                    <i class="fa-solid fa-plus"></i>
                    Nouvelle
                </button>
            </div>
        </div>

        <!-- Invoices table -->
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1 mt-1">
            <table class="table">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th class="text-right">Éléments</th>
                        <th class="text-right">Total TTC</th>
                        <th class="text-right">Statut</th>
                        <th class="text-right">Échéance</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="invoice in invoices" :key="invoice.id">
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
                                        <RouterLink :to="`/invoices/${invoice.id}/items`">
                                            <i class="fa-solid fa-pen"></i>
                                            Modifier
                                        </RouterLink>
                                    </li>

                                    <li>
                                        <a href="#" class="text-error" @click.prevent="remove(invoice)">
                                            <i class="fa-solid fa-trash"></i>
                                            Supprimer
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </td>
                    </tr>

                    <!-- Empty state -->
                    <tr v-if="invoices.length === 0">
                        <td colspan="7" class="text-center opacity-60 py-6">
                            Aucune facture trouvée
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :page="pagination.page" :total="total" :capacity="pagination.limit" />
    </div>
</template>