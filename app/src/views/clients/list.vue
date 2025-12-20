<script setup lang="ts">
import { ref, reactive } from 'vue';
import Pagination from '@/components/Pagination.vue';
import type { PaginationOptions } from '@/lib/base/paginated';
import { Client, api } from '@/lib/api/client';
import { useConfirmation } from '@/composables/popups/confirmation';

const confirmation = useConfirmation();
const clients = ref<Client[]>([]);
const total = ref(0);
const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 10
});

async function load() {
    const result = await api.getAll(pagination);
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

load();
</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <div class="flex">
            <h1 class="text-heading text-2xl my-2">
                <i class="fa-solid fa-user"></i>
                Clients
            </h1>

            <div class="ms-auto my-auto flex">
                <label class="input ms-auto input-sm">
                    <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                    <input type="search" required placeholder="Recherche" />
                </label>
                <RouterLink to="/clients/new" class="btn btn-sm ms-1">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </RouterLink>
            </div>
        </div>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1">
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
                                    <li><a><i class="fa-solid fa-pen"></i> Modifier</a></li>
                                    <li><a class="text-error" href="#" @click.prevent="remove(client)"><i
                                                class="fa-solid fa-trash"></i> Supprimer</a></li>
                                </ul>
                            </details>
                        </td>
                    </tr>

                    <!-- empty state -->
                    <tr v-if="clients.length === 0">
                        <td colspan="7" class="text-center opacity-60 py-6">
                            No clients found
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :page="pagination.page" :total="total" :capacity="pagination.limit" />
    </div>
</template>