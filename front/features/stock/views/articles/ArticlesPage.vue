<script setup lang="ts">
import TablePaginatedSearch from '@common/components/data/TablePaginatedSearch.vue';
import { usePageActions } from '@common/composables/data/pageActions';
import { formatDate } from '@common/utils/date';
import { articles } from '@features/stock/data/articles';
import { useTemplateRef } from 'vue';
import ArticleModal from './ArticleModal.vue';

const modalRef = useTemplateRef('modal');
const { list, total, remove, create, edit, refresh } = usePageActions(articles, (el) => modalRef?.value?.show(el));
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <h1 class="text-heading text-2xl">
            <i class="fa-solid fa-boxes-stacked"></i>
            Articles
        </h1>

        <TablePaginatedSearch class="flex-1 mt-1" ref="table" @refresh="refresh" :total="total" :items="list">
            <template #actions>
                <button class="btn btn-sm ms-1" @click="create()">
                    <i class="fa-solid fa-plus"></i>
                    Nouveau
                </button>
            </template>
            <template #header>
                <th>Article</th>
                <th>SKU</th>
                <th>Prix</th>
                <th>TVA</th>
                <th>Stock</th>
                <th data-sort-field="created">Créé le</th>
                <th></th>
            </template>
            <template #row="{ item: article }">
                <td>
                    <a class="font-medium" href="#" @click="edit(article)">
                        {{ article.name }}
                    </a>
                    <div class="text-sm opacity-60">
                        {{ article.description || '—' }}
                    </div>
                </td>
                <td>
                    {{ article.sku }}
                </td>
                <td>
                    {{ article.unitPrice.toFixed(2) }} €
                </td>
                <td>
                    {{ article.vatRate * 100}} %
                </td>
                <td>
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
                <td>
                    {{ formatDate(article.created) }}
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
