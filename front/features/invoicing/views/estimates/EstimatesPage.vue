<script setup lang="ts">
import TablePaginatedSearch from '@common/components/data/TablePaginatedSearch.vue';
import { useConfirmation } from '@common/composables/popups/confirmation';
import { formatDate } from '@common/utils/date';
import EstimateStatusBadge from './EstimateStatusBadge.vue';
import { PaginationOptions } from '@common/database/crud';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { usePageActions } from '@common/composables/data/pageActions';
import { estimates } from '@features/invoicing/data/estimates';
import type { EstimatesResponse } from '@common/database/types.g';

const router = useRouter();
const { list, total, remove, refresh } = usePageActions(estimates);

async function create() {
    const id = await estimates.create({} as EstimatesResponse);
    router.push(`/documents/estimates/${id}/items`);
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
                    {{ estimate.expand.client.firstName }} {{ estimate.expand.client.lastName }}
                </td>
                <td class="text-right">
                    {{ estimate.expand.services.length + estimate.expand.articles.length }}
                </td>
                <td class="text-right">{{ estimate.totalTTC.toFixed(2) }} €</td>
                <td class="text-right">
                    <EstimateStatusBadge :status="estimate.status" />
                </td>
                <td class="text-right">{{ formatDate(estimate.created) }}</td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-xs">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <RouterLink :to="`/documents/estimates/${estimate.id}/items`"><i
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