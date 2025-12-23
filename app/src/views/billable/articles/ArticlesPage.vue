<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useConfirmation } from '@/composables/popups/confirmation';
import { StockArticle, api } from '@/lib/api/billable/article';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref, useTemplateRef } from 'vue';

import ArticleModal from './ArticleModal.vue';

let search = "";
const confirmation = useConfirmation();
const modalRef = useTemplateRef('modal');

const articles = ref<StockArticle[]>([]);
const total = ref(0);

const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 10
});

async function load() {
    const result = await api.search(search, pagination);
    articles.value = result.data || [];
    total.value = result.total || 0;
}

async function remove(article: StockArticle) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer l’article <b>${article.name}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning'
    );

    if (!confirmed) {
        return;
    }

    await api.delete(article.id);
    await load();
}

async function edit(article: StockArticle)
{
    if (await modalRef.value?.show(article) == true)
        await load();
}

load();
</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <div class="flex">
            <h1 class="text-heading text-2xl my-2">
                <i class="fa-solid fa-boxes-stacked"></i>
                Articles
            </h1>

            <div class="ms-auto my-auto flex">
                <label class="input ms-auto input-sm">
                    <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                    <input
                        v-model="search"
                        type="search"
                        placeholder="Recherche"
                        @keyup.enter="load"
                    />
                </label>

                <button class="btn btn-sm ms-1" @click="edit(new StockArticle())">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </div>
        </div>

        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1">
            <table class="table">
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>SKU</th>
                        <th class="text-right">Prix</th>
                        <th class="text-right">Stock</th>
                        <th class="text-right">Créé le</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="article in articles" :key="article.id">
                        <td>
                            <div class="font-medium">
                                {{ article.name }}
                            </div>
                            <div class="text-sm opacity-60">
                                {{ article.description || '—' }}
                            </div>
                        </td>

                        <td>
                            {{ article.sku }}
                        </td>

                        <td class="text-right">
                            {{ article.price.toFixed(2) }} €
                        </td>

                        <td class="text-right">
                            <span
                                :class="[
                                    'badge',
                                    article.quantity === 0
                                        ? 'badge-error'
                                        : article.quantity < 10
                                        ? 'badge-warning'
                                        : 'badge-success'
                                ]"
                            >
                                {{ article.quantity }}
                            </span>
                        </td>

                        <td class="text-right">
                            {{ article.createdAt.toLocaleDateString() }}
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
                                            @click.prevent="edit(article)">
                                            <i class="fa-solid fa-pen"></i>
                                            Modifier
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="text-error"
                                            href="#"
                                            @click.prevent="remove(article)"
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
                    <tr v-if="articles.length === 0">
                        <td colspan="6" class="text-center opacity-60 py-6">
                            No articles found
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
        <ArticleModal ref="modal" />
    </div>
</template>