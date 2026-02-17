<script setup lang="ts">
import TablePaginatedSearch from '@common/components/data/TablePaginatedSearch.vue';
import { usePageActions } from '@common/composables/data/pageActions';
import { formatDate } from '@common/utils/date';
import { services } from '@features/stock/data/services';
import { useTemplateRef } from 'vue';
import ServiceModal from './ServiceModal.vue';

const modalRef = useTemplateRef('modal');
const { list, total, remove, create, edit, refresh } = usePageActions(services, (el) => modalRef?.value?.show(el));
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            Services
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1"
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
                <th>Service</th>
                <th>Code</th>
                <th>Prix</th>
                <th>TVA</th>
                <th>Durée</th>
                <th data-sort-field="created">Créé le</th>
                <th></th>
            </template>
            <template #row="{ item: service }">
                <td>
                    <div class="font-medium">
                        {{ service.name }}
                    </div>
                    <div class="text-sm opacity-60">
                        {{ service.description || '—' }}
                    </div>
                </td>
                <td>
                    {{ service.code }}
                </td>
                <td>
                    {{ service.unitPrice.toFixed(2) }} €
                </td>
                <td>
                    {{ service.vatRate * 100 }} %
                </td>
                <td>
                    <span v-if="service.durationHours">
                        {{ service.durationHours }} h
                    </span>
                    <span v-else
                          class="opacity-50">
                        —
                    </span>
                </td>
                <td>
                    {{ formatDate(service.created) }}
                </td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-xs">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <a href="#"
                                   @click.prevent="edit(service)">
                                    <i class="fa-solid fa-pen"></i>
                                    Modifier
                                </a>
                            </li>
                            <li>
                                <a class="text-error"
                                   href="#"
                                   @click.prevent="remove(service)">
                                    <i class="fa-solid fa-trash"></i>
                                    Supprimer
                                </a>
                            </li>
                        </ul>
                    </details>
                </td>
            </template>
        </TablePaginatedSearch>

        <ServiceModal ref="modal" />
    </div>
</template>