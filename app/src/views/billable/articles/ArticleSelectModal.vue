<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useDeferredModal } from '@/composables/popups/modal';
import { StockArticle, api } from '@/lib/api/billable/article';
import { debounce } from '@/lib/base/debounce';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref, useTemplateRef } from 'vue';

let search = "";

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
let selected = ref<StockArticle | null>(null);

const articles = ref<StockArticle[]>([]);
const total = ref(0);

const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 5
});
const debouncedLoad = debounce(load, 300);

async function load() {
    const result = await api.search(search, pagination);
    articles.value = result.data || [];
    total.value = result.total || 0;
}

function confirm() {
    if (!selected.value)
        return;

    selected.value.isSelected = false;
    modal.confirm();
}

function select(article: StockArticle) {
    if (article.isSelected) {

        article.isSelected = false;
        selected.value = null;
        return;
    }

    // Unselect all articles
    for (const a of articles.value) {
        a.isSelected = false;
    }

    // Select the clicked one
    article.isSelected = true;
    selected.value = article;
}

defineExpose({
    show: modal.show,
    selected
});

load();
</script>

<template>
    <dialog ref="dialog"
            class="modal">
        <div class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    @click="modal.cancel"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-lg font-bold">Sélectionner un article</h3>

            <label class="input input-sm w-full mt-4">
                <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                <input @input="debouncedLoad"
                       type="search"
                       required
                       placeholder="Recherche"
                       v-model="search" />
            </label>
            <ul class="list bg-base-100 rounded-box border border-base-content/5 mt-1 max-h-128 overflow-y-auto">
                <li class="flex h-32"
                    v-if="articles.length == 0">
                    <span class="opacity-50 m-auto">Aucun résultat</span>
                </li>

                <li class="list-row cursor-pointer"
                    :class="{ 'bg-base-300': article.isSelected }"
                    v-for="article in articles"
                    :key="article.id"
                    @click="select(article)">
                    <div class="my-auto"><input type="checkbox"
                               class="checkbox"
                               :checked="article.isSelected"
                               readonly="true" /></div>
                    <div class="list-col-grow">
                        <div>{{ article.name }}</div>
                        <div class="uppercase opacity-60">{{ article.sku }}</div>
                    </div>
                    <div class="text-right opacity-60">
                        <div>{{ article.price.toFixed(2) }} €</div>
                        <span :class="[
                            'badge',
                            article.quantity === 0
                                ? 'badge-error'
                                : article.quantity < 10
                                    ? 'badge-warning'
                                    : 'badge-success'
                        ]">
                            {{ article.quantity }}
                        </span>
                    </div>
                </li>
            </ul>
            <Pagination :page="pagination.page"
                        :total="total"
                        :capacity="pagination.limit" />

            <div class="modal-action">
                <button @click="modal.cancel"
                        class="btn btn-neutral">
                    <i class="fa-solid fa-circle-xmark"></i>
                    Annuler
                </button>
                <button class="btn btn-primary"
                        :disabled="selected == undefined"
                        @click="confirm">
                    <i class="fa-solid fa-plus"></i>
                    Sélectionner
                </button>
            </div>

        </div>
        <div class="modal-backdrop">
            <button @click="modal.cancel">close</button>
        </div>
    </dialog>
</template>