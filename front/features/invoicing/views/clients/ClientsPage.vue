<script setup lang="ts">
import { formatDate } from '@common/utils/date';
import { clients } from '@features/invoicing/data/clients';

import { useTemplateRef } from 'vue';
import ClientModal from './ClientModal.vue';

import TablePaginatedSearch from '@common/components/data/TablePaginatedSearch.vue';
import { usePageActions } from '@common/composables/data/pageActions';
import { useEstimatesActions } from '@features/invoicing/composables/estimatesActions';

const modalRef = useTemplateRef('modal');

const { list, total, remove, create, edit, refresh } = usePageActions(clients, (el) => modalRef?.value?.show(el));
const estimatesActions = useEstimatesActions();

</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-user"></i>
            Clients
        </h1>

        <TablePaginatedSearch class="flex-1"
                              ref="table"
                              @refresh="refresh"
                              :total="total"
                              :items="list">
            <template #actions>
                <button class="btn btn-sm ms-1"
                        @click="create()">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </template>
            <template #header>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th data-sort-field="created">Crée le</th>
                <th></th>
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
                    <a :href="`mailto:${client.email}`"
                       class="link link-hover">
                        {{ client.email }}
                    </a>
                </td>

                <td>
                    {{ client.phone || '—' }}
                </td>

                <td>
                    {{ formatDate(client.created) }}
                </td>

                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-xs">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <a href="#"
                                   @click.prevent="estimatesActions.createAndNavigate(client.id)">
                                    <i class="fa-solid fa-file-invoice"></i>
                                    Nouveau devis
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   @click.prevent="edit(client)">
                                    <i class="fa-solid fa-pen"></i>
                                    Modifier
                                </a>
                            </li>
                            <li><a class="text-error"
                                   href="#"
                                   @click.prevent="remove(client)"><i class="fa-solid fa-trash"></i> Supprimer</a></li>
                        </ul>
                    </details>
                </td>
            </template>
        </TablePaginatedSearch>

        <ClientModal ref="modal" />
    </div>
</template>