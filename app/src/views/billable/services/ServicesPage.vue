<script setup lang="ts">
import { useConfirmation } from '@/composables/popups/confirmation';
import { Service, api } from '@/lib/api/billables/services';
import { useTemplateRef, ref } from 'vue';
import ServiceModal from './ServiceModal.vue';
import TablePaginatedSearch from '@/components/data/TablePaginatedSearch.vue';

const confirmation = useConfirmation();
const modalRef = useTemplateRef('modal');
const tableRef = useTemplateRef('table');

const services = ref<Service[]>([]);
const total = ref(0);

async function remove(service: Service) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer le service <b>${service.name}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning'
    );

    if (!confirmed) {
        return;
    }

    await api.delete(service.id);
    tableRef.value?.refresh();
}

async function edit(service: Service) {
    if (await modalRef.value?.show(service) == true)
        tableRef.value?.refresh();
}

async function refresh(search: string, pagination: { page: number, limit: number }) {
    const result = await api.search(search, pagination);
    services.value = result.data || [];
    total.value = result.total || 0;
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            Services
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1" ref="table" @refresh="refresh" :total="total" :items="services">
            <template #actions>
                <button class="btn btn-sm ms-1" @click="edit(new Service())">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </template>
            <template #header>
                <th>Service</th>
                <th>Code</th>
                <th class="text-right">Prix</th>
                <th class="text-right">TVA</th>
                <th class="text-right">Durée</th>
                <th class="text-right">Créé le</th>
                <th class="text-right">Actions</th>
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
                <td class="text-right">
                    {{ service.unitPrice.toFixed(2) }} €
                </td>
                                <td class="text-right">
                    {{ service.vatRateType * 100 }} %
                </td>
                <td class="text-right">
                    <span v-if="service.durationHours">
                        {{ service.durationHours }} h
                    </span>
                    <span v-else class="opacity-50">
                        —
                    </span>
                </td>
                <td class="text-right">
                    {{ service.createdAt.toLocaleDateString() }}
                </td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-sm">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <a href="#" @click.prevent="edit(service)">
                                    <i class="fa-solid fa-pen"></i>
                                    Modifier
                                </a>
                            </li>
                            <li>
                                <a class="text-error" href="#" @click.prevent="remove(service)">
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