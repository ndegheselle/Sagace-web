<script setup lang="ts">
import { useConfirmation } from '@/composables/popups/confirmation';
import { StockArticle, api } from '@/data/billables/articles';
import { useTemplateRef, ref } from 'vue';
import ArticleModal from './ArticleModal.vue';
import TablePaginatedSearch from '@/components/data/TablePaginatedSearch.vue';
import { formatDate } from '@/base/DateUtils';

const confirmation = useConfirmation();
const modalRef = useTemplateRef('modal');
const tableRef = useTemplateRef('table');

const articles = ref<StockArticle[]>([]);
const total = ref(0);

async function remove(article: StockArticle) {
    const confirmed = await confirmation.show(
        'Confirmer la suppression',
        `Êtes-vous sûr de vouloir supprimer l’article <b>${article.name}</b> ?`,
        'fa-solid fa-triangle-exclamation text-warning'
    );

    if (!confirmed) {
        return;
    }

    await api.delete(article._id);
    tableRef.value?.refresh();
}

async function edit(article: StockArticle) {
    if (await modalRef.value?.show(article) == true)
        tableRef.value?.refresh();
}

async function refresh(search: string, pagination: { page: number, limit: number }) {
    const result = await api.search(search, pagination);
    articles.value = result.data || [];
    total.value = result.total || 0;
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-boxes-stacked"></i>
            Articles
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1" ref="table" @refresh="refresh" :total="total" :items="articles">
            <template #actions>
                <button class="btn btn-sm ms-1" @click="edit(new StockArticle())">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </template>
            <template #header>
                <th>Article</th>
                <th>SKU</th>
                <th class="text-right">Prix</th>
                <th class="text-right">TVA</th>
                <th class="text-right">Stock</th>
                <th class="text-right">Créé le</th>
                <th class="text-right">Actions</th>
            </template>
            <template #row="{ item: article }">
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
                    {{ article.unitPrice.toFixed(2) }} €
                </td>
                <td class="text-right">
                    {{ article.vatRateType * 100 }} %
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
                    {{ formatDate(article.createdAt) }}
                </td>
                <td class="text-right">
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-circle btn-xs">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </summary>
                        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <a href="#" @click.prevent="edit(article)">
                                    <i class="fa-solid fa-pen"></i>
                                    Modifier
                                </a>
                            </li>
                            <li>
                                <a class="text-error" href="#" @click.prevent="remove(article)">
                                    <i class="fa-solid fa-trash"></i>
                                    Supprimer
                                </a>
                            </li>
                        </ul>
                    </details>
                </td>
            </template>
        </TablePaginatedSearch>

        <ArticleModal ref="modal" />
    </div>
</template>
