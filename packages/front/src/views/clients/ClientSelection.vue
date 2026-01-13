<script setup lang="ts">
import ListPaginatedSearch from '@/components/data/ListPaginatedSearch.vue';
import { Client, api } from '@/lib/api/clients';
import type { PaginationOptions } from 'sagace-common/base/paginated';
import { ref } from 'vue';

const props = defineProps<{
  selected: Client | null;
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: Client | null): void;
}>();

const clients = ref<Client[]>([]);
const total = ref(0);

async function load(search: string, pagination: PaginationOptions) {
  const result = await api.search(search, pagination);
  clients.value = result.data || [];
  total.value = result.total || 0;
}
</script>

<template>
  <ListPaginatedSearch
    v-model:selected="props.selected"
    :total="total"
    :items="clients"
    @refresh="load"
    @update:selected="emit('update:selected', $event)"
  >
    <template #row="{ item: client }">
      <div class="my-auto">
        <input type="checkbox" class="checkbox" :checked="props.selected?._id === client._id" readonly />
      </div>
      <div class="my-auto">
        <i class="fa-regular fa-user"></i>
      </div>
      <div class="list-col-grow">
        <div>{{ client.fullName }}</div>
        <div class="uppercase opacity-60">{{ client.address }}</div>
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