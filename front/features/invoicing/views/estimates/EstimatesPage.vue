<script setup lang="ts">
import TablePaginatedSearch from '@/components/data/TablePaginatedSearch.vue';
import { useConfirmation } from '@/composables/popups/confirmation';
import { api, Estimate } from '@/data/documents/estimates';
import { formatDate } from '@/base/DateUtils';
import EstimateStatusBadge from '@/views/documents/estimates/EstimateStatusBadge.vue';
import { PaginationOptions } from '@sagace/common';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const confirmation = useConfirmation();
const router = useRouter();
const tableRef = useTemplateRef('table');

const total = ref<number>(0);
const estimates = ref<Estimate[]>([]);

async function remove(estimate: Estimate) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer le devis <b>${estimate.reference}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning'
    );

    if (!confirmed) {
        return;
    }

    await api.delete(estimate._id);
    tableRef.value?.refresh();
}

async function create() {
    const id = await api.create(new Estimate());
    router.push(`/documents/estimates/${id}/items`);
}

async function refresh(search: string, pagination: PaginationOptions) {
    const result = await api.search(search, pagination);
    estimates.value = result.data || [];
    total.value = result.total || 0;
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-file-invoice"></i>
            Devis
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1" ref="table" @refresh="refresh" :total="total" :items="estimates">
            <template #actions>
                <button class="btn btn-sm ms-1" @click="create">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </template>
            <template #header>
                <th>Référence</th>
                <th>Client</th>
                <th class="text-right">Élements</th>
                <th class="text-right">Total TTC</th>
                <th class="text-right" data-sort-field="status">Statut</th>
                <th class="text-right" data-sort-field="createdAt">Créé le</th>
                <th class="text-right">Actions</th>
            </template>
            <template #row="{ item: estimate }">
                <td>{{ estimate.reference }}</td>
                <td>
                    {{ estimate.client?.fullName }}
                </td>
                <td class="text-right">
                    {{ estimate.lines.length }}
                </td>
                <td class="text-right">{{ estimate.totalTTC.toFixed(2) }} €</td>
                <td class="text-right">
                    <EstimateStatusBadge :status="estimate.status" />
                </td>
                <td class="text-right">{{ formatDate(estimate.createdAt) }}</td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-xs">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <RouterLink :to="`/documents/estimates/${estimate._id}/items`"><i
                                        class="fa-solid fa-pen"></i> Modifier</RouterLink>
                            </li>
                            <li><a class="text-error" href="#" @click.prevent="remove(estimate)"><i
                                        class="fa-solid fa-trash"></i> Supprimer</a></li>
                        </ul>
                    </details>
                </td>
            </template>
        </TablePaginatedSearch>
    </div>
</template>