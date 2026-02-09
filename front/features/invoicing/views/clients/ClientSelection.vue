<script setup lang="ts">
import ListPaginatedSearch from '@common/components/data/ListPaginatedSearch.vue';
import { clients } from '@features/invoicing/data/clients';
import type { ClientsResponse } from '@common/database/types.g';
import type { PaginationOptions } from '@common/database/crud';
import { ref } from 'vue';

const props = defineProps<{
  selected: ClientsResponse | null;
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: ClientsResponse | null): void;
}>();

const list = ref<ClientsResponse[]>([]);
const total = ref(0);

async function load(search: string, pagination: PaginationOptions) {
  const result = await clients.search(search, pagination);
  list.value = result.data || [];
  total.value = result.total || 0;
}
</script>

<template>
  <ListPaginatedSearch
    v-model:selected="props.selected"
    :total="total"
    :items="list"
    @refresh="load"
    @update:selected="emit('update:selected', $event)"
  >
    <template #row="{ item: client }">
      <div class="my-auto">
        <input type="checkbox" class="checkbox" :checked="props.selected?.id === client.id" readonly />
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
</template>