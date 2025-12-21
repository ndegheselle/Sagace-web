<script setup lang="ts">
import { ref, reactive } from 'vue';
import Pagination from '@/components/Pagination.vue';
import type { PaginationOptions } from '@/lib/base/paginated';
import { Estimate, api, EnumEstimateStatus } from '@/lib/api/estimate';
import { useConfirmation } from '@/composables/popups/confirmation';
import { RouterLink } from 'vue-router';

let search = "";
const confirmation = useConfirmation();
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

load();
</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <!-- Header -->
        <div class="flex">
            <h1 class="text-heading text-2xl my-2">
                <i class="fa-solid fa-file-invoice"></i>
                Devis
            </h1>

            <div class="ms-auto my-auto flex">
                <label class="input ms-auto input-sm">
                    <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                    <input
                        type="search"
                        v-model="search"
                        placeholder="Recherche"
                        @keyup.enter="load"
                    />
                </label>
                <RouterLink to="/estimates/new" class="btn btn-sm ms-1">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </RouterLink>
            </div>
        </div>

        <!-- Estimates table -->
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1">
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
                            <span
                                :class="[
                                    'badge',
                                    estimate.status === EnumEstimateStatus.Draft
                                        ? 'badge-neutral'
                                        : estimate.status === EnumEstimateStatus.Sent
                                        ? 'badge-warning'
                                        : 'badge-success'
                                ]"
                            >
                                {{ EnumEstimateStatus[estimate.status] }}
                            </span>
                        </td>
                        <td class="text-right">{{ estimate.createdAt.toLocaleDateString() }}</td>
                        <td class="text-right">
                            <details class="dropdown dropdown-end">
                                <summary class="btn btn-circle btn-sm">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </summary>
                                <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><RouterLink :to="`/estimates/edit/${estimate.id}`"><i class="fa-solid fa-pen"></i> Modifier</RouterLink></li>
                                    <li><a class="text-error" href="#" @click.prevent="remove(estimate)"><i class="fa-solid fa-trash"></i> Supprimer</a></li>
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