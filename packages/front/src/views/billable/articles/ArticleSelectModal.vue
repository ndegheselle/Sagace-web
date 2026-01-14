<script setup lang="ts">
import ListPaginatedSearch from '@/components/data/ListPaginatedSearch.vue';
import { useDeferredModal } from '@/composables/popups/modal';
import { StockArticle, api } from '@/lib/api/billables/articles';
import type { PaginationOptions } from '@sagace/common/base/paginated';
import { ref, useTemplateRef } from 'vue';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
const selected = ref<StockArticle | null>(null);
const articles = ref<StockArticle[]>([]);
const total = ref(0);

async function load(search: string, pagination: PaginationOptions) {
  const result = await api.search(search, pagination);
  articles.value = result.data || [];
  total.value = result.total || 0;
}

function confirm() {
  if (!selected.value) return;
  modal.confirm();
}

defineExpose({
  show: modal.show,
  selected,
});
</script>

<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="modal.cancel"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h3 class="text-lg font-bold">Sélectionner un article</h3>

      <!-- Use ListPaginatedSearch for search, pagination, and selection -->
      <ListPaginatedSearch
        v-model:selected="selected"
        :total="total"
        :items="articles"
        @refresh="load"
      >
        <template #row="{ item: article }">
          <div class="my-auto">
            <input
              type="checkbox"
              class="checkbox"
              :checked="selected?._id === article._id"
              readonly
            />
          </div>
          <div class="list-col-grow">
            <div>{{ article.name }}</div>
            <div class="uppercase opacity-60">{{ article.sku }}</div>
          </div>
          <div class="text-right">
            <div>{{ article.unitPrice.toFixed(2) }} €</div>
            <span
              :class="[
                'badge',
                article.quantity === 0
                  ? 'badge-error'
                  : article.quantity < 10
                  ? 'badge-warning'
                  : 'badge-success',
              ]"
            >
              {{ article.quantity }}
            </span>
          </div>
        </template>
      </ListPaginatedSearch>

      <div class="modal-action">
        <button @click="modal.cancel" class="btn btn-neutral">
          <i class="fa-solid fa-circle-xmark"></i>
          Annuler
        </button>
        <button
          class="btn btn-primary"
          :disabled="selected === null"
          @click="confirm"
        >
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