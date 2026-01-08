<script setup lang="ts">
import ListPaginatedSearch from '@/components/data/ListPaginatedSearch.vue';
import { useDeferredModal } from '@/composables/popups/modal';
import { Service, api } from '@/lib/api/billables/services';
import type { PaginationOptions } from 'sagace-common/base/paginated';
import { ref, useTemplateRef } from 'vue';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
const selected = ref<Service | null>(null);
const services = ref<Service[]>([]);
const total = ref(0);

async function load(search: string, pagination: PaginationOptions) {
  const result = await api.search(search, pagination);
  services.value = result.data || [];
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

      <h3 class="text-lg font-bold">Sélectionner un service</h3>

      <!-- Use ListPaginatedSearch for search, pagination, and selection -->
      <ListPaginatedSearch
        v-model:selected="selected"
        :total="total"
        :items="services"
        @refresh="load"
      >
        <template #row="{ item: service }">
          <div class="my-auto">
            <input
              type="checkbox"
              class="checkbox"
              :checked="selected?.id === service.id"
              readonly
            />
          </div>

          <div class="list-col-grow">
            <div>{{ service.name }}</div>
            <div class="uppercase opacity-60">{{ service.code }}</div>
            <div
              v-if="service.description"
              class="text-sm opacity-50 truncate"
            >
              {{ service.description }}
            </div>
          </div>

          <div class="text-right opacity-60">
            <div>{{ service.unitPrice.toFixed(2) }} €</div>
            <div
              v-if="service.durationHours"
              class="badge badge-outline"
            >
              {{ service.durationHours }} h
            </div>
          </div>
        </template>
      </ListPaginatedSearch>

      <div class="modal-action">
        <button
          class="btn btn-neutral"
          @click="modal.cancel"
        >
          <i class="fa-solid fa-circle-xmark"></i>
          Annuler
        </button>

        <button
          class="btn btn-primary"
          :disabled="!selected"
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
