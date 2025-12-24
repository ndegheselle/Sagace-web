<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useConfirmation } from '@/composables/popups/confirmation';
import { Client, api } from '@/lib/api/client';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref, useTemplateRef } from 'vue';
import ClientModal from './ClientModal.vue';
import { Estimate, api as estimateApi } from '@/lib/api/document/estimate';
import { useRouter } from 'vue-router';
import { debounce } from '@/lib/base/debounce';

let search = "";
const confirmation = useConfirmation();
const router = useRouter();
const modalRef = useTemplateRef('modal');

const clients = ref<Client[]>([]);
const total = ref(0);
const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 10
});

async function load() {
    const result = await api.search(search, pagination);
    clients.value = result.data || [];
    total.value = result.total || 0;
}

async function remove(client: Client) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer le client <b>${client.firstName} ${client.lastName}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning');

    if (!confirmed) {
        return;
    }

    await api.delete(client.id);
    await load();
}

async function edit(client: Client) {
    if (await modalRef.value?.show(client) == true)
        await load();
}

async function createEstimate(client: Client)
{
    const estimate = new Estimate();
    estimate.client = client;
    const id = await estimateApi.create(estimate);
    router.push(`/documents/estimates/${id}/items`);
}

const debouncedLoad = debounce(load, 300);
load();
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <div class="flex">
            <h1 class="text-heading text-2xl">
                <i class="fa-solid fa-user"></i>
                Clients
            </h1>

            <div class="ms-auto my-auto flex">
                <label class="input ms-auto input-sm">
                    <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                    <input @input="debouncedLoad" type="search" placeholder="Recherche" v-model="search" />
                </label>

                <button class="btn btn-sm ms-1" @click="edit(new Client())">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </div>
        </div>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1 mt-1">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Entreprise</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Crée le</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>

                <!-- body -->
                <tbody>
                    <tr v-for="client in clients" :key="client.id">
                        <td>
                            <div class="font-medium">
                                {{ client.firstName }} {{ client.lastName }}
                            </div>
                            <div class="text-sm opacity-60">
                                {{ client.address || '—' }}
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
                            {{ client.createdAt.toLocaleDateString() }}
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
                    </tr>

                    <!-- empty state -->
                    <tr v-if="clients.length === 0">
                        <td colspan="7" class="text-center opacity-60 py-6">
                            Aucun résultat
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :page="pagination.page" :total="total" :capacity="pagination.limit" />
        <ClientModal ref="modal" />
    </div>
</template>