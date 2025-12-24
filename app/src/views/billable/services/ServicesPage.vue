<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useConfirmation } from '@/composables/popups/confirmation';
import { Service, api } from '@/lib/api/billable/service';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref, useTemplateRef } from 'vue';
import ServiceModal from './ServiceModal.vue';
import { debounce } from '@/lib/base/debounce';

let search = "";
const confirmation = useConfirmation();
const modalRef = useTemplateRef('modal');

const services = ref<Service[]>([]);
const total = ref(0);

const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 10
});

async function load() {
    const result = await api.search(search, pagination);
    services.value = result.data || [];
    total.value = result.total || 0;
}

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
    await load();
}

async function edit(service: Service)
{
    if (await modalRef.value?.show(service) == true)
        await load();
}

const debouncedLoad = debounce(load, 300);
load();
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <div class="flex">
            <h1 class="text-heading text-2xl my-2">
                <i class="fa-solid fa-screwdriver-wrench"></i>
                Services
            </h1>

            <div class="ms-auto my-auto flex">
                <label class="input ms-auto input-sm">
                    <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                    <input @input="debouncedLoad" type="search" placeholder="Recherche" v-model="search" />
                </label>

                <button class="btn btn-sm ms-1" @click="edit(new Service())">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </div>
        </div>

        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1 mt-1">
            <table class="table">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Code</th>
                        <th class="text-right">Prix</th>
                        <th class="text-right">Durée</th>
                        <th class="text-right">Créé le</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="service in services" :key="service.id">
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
                            {{ service.price.toFixed(2) }} €
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
                                        <a 
                                            href="#"
                                            @click.prevent="edit(service)">
                                            <i class="fa-solid fa-pen"></i>
                                            Modifier
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="text-error"
                                            href="#"
                                            @click.prevent="remove(service)"
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                            Supprimer
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </td>
                    </tr>

                    <!-- empty state -->
                    <tr v-if="services.length === 0">
                        <td colspan="6" class="text-center opacity-60 py-6">
                            Aucun service trouvé
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination
            :page="pagination.page"
            :total="total"
            :capacity="pagination.limit"
        />
        <ServiceModal ref="modal" />
    </div>
</template>