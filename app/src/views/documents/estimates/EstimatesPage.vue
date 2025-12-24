<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useConfirmation } from '@/composables/popups/confirmation';
import { api, Estimate } from '@/lib/api/document/estimate';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import EstimateStatusBadge from '@/views/documents/estimates/EstimateStatusBadge.vue';
import { debounce } from '@/lib/base/debounce';

let search = "";
const confirmation = useConfirmation();
const router = useRouter();
const estimates = ref<Estimate[]>([]);
const total = ref(0);
const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 10
});

async function load() {
    const result = await api.search(search, pagination);
    estimates.value = result.data || [];
    total.value = result.total || 0;
}

async function remove(estimate: Estimate) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer le devis <b>${estimate.reference}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning'
    );

    if (!confirmed) return;

    await api.delete(estimate.id);
    await load();
}

async function create() {
    const id = await api.create(new Estimate());
    router.push(`/documents/estimates/${id}/items`);
}

const debouncedLoad = debounce(load, 300);
load();
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <!-- Header -->
        <div class="flex">
            <h1 class="text-heading text-2xl">
                <i class="fa-solid fa-file-invoice"></i>
                Devis
            </h1>

            <div class="ms-auto my-auto flex">
                <label class="input ms-auto input-sm">
                    <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                    <input @input="debouncedLoad" type="search" placeholder="Recherche" v-model="search" />
                </label>
                <button @click="create" class="btn btn-sm ms-1">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </div>
        </div>

        <!-- Estimates table -->
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1 mt-1">
            <table class="table">
                <thead>
                    <tr>
                        <th>Référence</th>
                        <th>Client</th>
                        <th class="text-right">Élements</th>
                        <th class="text-right">Total TTC</th>
                        <th class="text-right">Statut</th>
                        <th class="text-right">Créé le</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="estimate in estimates" :key="estimate.id">
                        <td>{{ estimate.reference }}</td>
                        <td>
                            {{ estimate.client?.firstName }} {{ estimate.client?.lastName || '' }}
                        </td>
                        <td class="text-right">
                            {{ estimate.lines.length }}
                        </td>
                        <td class="text-right">{{ estimate.totalTTC.toFixed(2) }} €</td>
                        <td class="text-right">
                            <EstimateStatusBadge :status="estimate.status" />
                        </td>
                        <td class="text-right">{{ estimate.createdAt.toLocaleDateString() }}</td>
                        <td class="text-right">
                            <details class="dropdown dropdown-end">
                                <summary class="btn btn-circle btn-sm">
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
                    </tr>

                    <!-- Empty state -->
                    <tr v-if="estimates.length === 0">
                        <td colspan="7" class="text-center opacity-60 py-6">
                            Aucun devis trouvé
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :page="pagination.page" :total="total" :capacity="pagination.limit" />
    </div>
</template>