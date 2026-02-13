<script setup lang="ts">
import TablePaginatedSearch from '@common/components/data/TablePaginatedSearch.vue';
import { formatDate } from '@common/utils/date';
import { useEstimatesActions } from '@features/invoicing/composables/estimatesActions';
import { totalTTC } from '@features/invoicing/data/estimates';
import ClientSelectModal from '@features/invoicing/views/clients/ClientSelectModal.vue';
import { useTemplateRef } from 'vue';
import EstimateStatusBadge from './EstimateStatusBadge.vue';

const modalClientRef = useTemplateRef('modalSelectionClient');
const { list, total, remove, refresh, createAndNavigate, navigateToEdit } = useEstimatesActions();

async function create()
{
    if (modalClientRef.value == null)
        return;

    if (await modalClientRef.value.show() == true && modalClientRef.value.selected) {
        createAndNavigate(modalClientRef.value.selected.id);
    }
}

</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-file-invoice"></i>
            Devis
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1" ref="table" @refresh="refresh" :total="total" :items="list">
            <template #actions>
                <button class="btn btn-sm ms-1" @click="create()">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </template>
            <template #header>
                <th>Référence</th>
                <th>Client</th>
                <th>Élements</th>
                <th>Total TTC</th>
                <th data-sort-field="status">Statut</th>
                <th data-sort-field="createdAt">Créé le</th>
                <th></th>
            </template>
            <template #row="{ item: estimate }">
                <td>{{ estimate.reference }}</td>
                <td>
                    {{ estimate.expand.client.firstName }} {{ estimate.expand.client.lastName }}
                </td>
                <td>
                    {{ (estimate.expand.services?.length ?? 0) + (estimate.expand.articles?.length ?? 0) }}
                </td>
                <td>{{ totalTTC(estimate).toFixed(2) }} €</td>
                <td>
                    <EstimateStatusBadge :status="estimate.status" />
                </td>
                <td>{{ formatDate(estimate.created) }}</td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-xs">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><a href="#" @click.prevent="navigateToEdit(estimate)"><i
                                        class="fa-solid fa-pen"></i> Modifier</a></li>
                            <li><a class="text-error" href="#" @click.prevent="remove(estimate)"><i
                                        class="fa-solid fa-trash"></i> Supprimer</a></li>
                        </ul>
                    </details>
                </td>
            </template>
        </TablePaginatedSearch>

        <ClientSelectModal ref="modalSelectionClient" />
    </div>
</template>