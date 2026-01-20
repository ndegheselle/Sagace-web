<script setup lang="ts">
import { useConfirmation } from '@/composables/popups/confirmation';
import { Client, api } from '@/lib/api/clients';
import { Estimate, api as estimateApi } from '@/lib/api/documents/estimates';
import { formatDate } from '@/lib/base/DateUtils';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import ClientModal from './ClientModal.vue';

import TablePaginatedSearch from '@/components/data/TablePaginatedSearch.vue';
import type { PaginationOptions } from '@sagace/common';

const confirmation = useConfirmation();
const router = useRouter();
const modalRef = useTemplateRef('modal');
const tableRef = useTemplateRef('table');

const clients = ref<Client[]>([]);
const total = ref<number>(0);

async function remove(client: Client) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer le client <b>${client.firstName} ${client.lastName}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning');

    if (!confirmed) {
        return;
    }

    await api.delete(client._id);
    tableRef.value?.refresh();
}

async function edit(client: Client) {
    if (await modalRef.value?.show(client) == true)
        tableRef.value?.refresh();
}

async function createEstimate(client: Client) {
    const estimate = new Estimate();
    estimate.client = client;
    const id = await estimateApi.create(estimate);
    router.push(`/documents/estimates/${id}/items`);
}

async function refresh(search: string, pagination: PaginationOptions) {
    const result = await api.search(search, pagination);
    clients.value = result.data || [];
    total.value = result.total || 0;
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-user"></i>
            Clients
        </h1>

        <TablePaginatedSearch class="flex-1" ref="table" @refresh="refresh" :total="total" :items="clients">
            <template #actions>
                <button class="btn btn-sm ms-1" @click="edit(new Client())">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </template>
            <template #header>
                <th>Nom</th>
                <th>Entreprise</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Crée le</th>
                <th class="text-right">Actions</th>
            </template>
            <template #row="{ item: client }">
                <td>
                    <div class="font-medium">
                        {{ client.firstName }} {{ client.lastName }}
                    </div>
                    <div class="text-sm opacity-60">
                        {{ client.adress || '—' }}
                    </div>
                </td>

                <td>
                    {{ client.company || '—' }}
                </td>

                <td>
                    <a :href="`mailto:${client.email}`" class="link link-hover">
                        {{ client.email }}
                    </a>
                </td>

                <td>
                    {{ client.phone || '—' }}
                </td>

                <td>
                    {{ formatDate(client.createdAt) }}
                </td>

                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-sm">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <a href="#" @click.prevent="createEstimate(client)">
                                    <i class="fa-solid fa-file-invoice"></i>
                                    Nouveau devis
                                </a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="edit(client)">
                                    <i class="fa-solid fa-pen"></i>
                                    Modifier
                                </a>
                            </li>
                            <li><a class="text-error" href="#" @click.prevent="remove(client)"><i
                                        class="fa-solid fa-trash"></i> Supprimer</a></li>
                        </ul>
                    </details>
                </td>
            </template>
        </TablePaginatedSearch>

        <ClientModal ref="modal" />
    </div>
</template>