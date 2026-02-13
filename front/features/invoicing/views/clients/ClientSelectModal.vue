<script setup lang="ts">
import ListPaginatedSearch from '@common/components/data/ListPaginatedSearch.vue';
import { useDeferredModal } from '@common/composables/popups/modal';
import type { PaginationOptions } from '@common/database/crud';
import { clients, type ClientData } from '@features/invoicing/data/clients';
import { ref, useTemplateRef } from 'vue';

const selected = ref<ClientData | null>(null);
const list = ref<ClientData[]>([]);
const total = ref(0);

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);

async function load(search: string, pagination: PaginationOptions) {
  const result = await clients.search(search, pagination);
  list.value = result.data || [];
  total.value = result.total || 0;
}

defineExpose({ selected, show: modal.show });
</script>

<template>
  <dialog ref="dialog"
          class="modal">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              @click="modal.cancel()">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h3 class="text-lg font-bold">
        Sélectionner un client
      </h3>


      <ListPaginatedSearch v-model:selected="selected"
                           :total="total"
                           :items="list"
                           @refresh="load">
        <template #row="{ item: client }">
          <div class="my-auto">
            <input type="checkbox"
                   class="checkbox"
                   :checked="selected?.id === client.id"
                   readonly />
          </div>
          <div class="my-auto">
            <i class="fa-regular fa-user"></i>
          </div>
          <div class="list-col-grow">
            <div>{{ client.firstName }} {{ client.lastName }}</div>
            <div class="uppercase opacity-60">{{ client.adress }}</div>
          </div>
          <div class="text-right opacity-60">
            <div>
              <i class="fa-solid fa-envelope text-xs"></i> {{ client.email }}
            </div>
            <div>
              <i class="fa-solid fa-phone text-xs"></i> {{ client.phone }}
            </div>
          </div>
        </template>
      </ListPaginatedSearch>

      <!-- Actions -->
      <div class="modal-action">
        <slot name="actions">
          <button class="btn btn-neutral"
                  @click="modal.cancel()">
            <i class="fa-solid fa-circle-xmark"></i>
            Annuler
          </button>
          <button class="btn btn-primary"
                  @click="modal.confirm()">
          <i class="fa-solid fa-plus"></i>
            Sélectionner
          </button>
        </slot>
      </div>
    </div>

    <div class="modal-backdrop">
      <button @click="modal.cancel()">close</button>
    </div>
  </dialog>
</template>