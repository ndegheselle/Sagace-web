<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { Client, api } from '@/lib/api/client';
import { debounce } from '@/lib/base/debounce';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref, watch } from 'vue';

const props = defineProps<{
  selected: Client | null;
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: Client | null): void;
}>();

let search = "";
const clients = ref<Client[]>([]);
const total = ref(0);
const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 5
});
const selected = ref<Client | null>(props.selected);

async function load() {
    const result = await api.search(search, pagination);
    clients.value = result.data || [];
    total.value = result.total || 0;
}

function select(client: Client) {
    if (client.isSelected) {
        client.isSelected = false;
        selected.value = null;
        emit('update:selected', null);
        return;
    }

    // Unselect all clients
    for (const s of clients.value) {
        s.isSelected = false;
    }

    // Select the clicked one
    client.isSelected = true;
    selected.value = client;
    emit('update:selected', client);
}

const debouncedLoad = debounce(load, 300);
load();

// Watch for external changes to the selected prop
watch(() => props.selected, (newVal) => {
    selected.value = newVal;
    // Optionally, update the UI to reflect the new selection
    if (newVal) {
        for (const s of clients.value) {
            s.isSelected = s.id === newVal.id;
        }
    } else {
        for (const s of clients.value) {
            s.isSelected = false;
        }
    }
});
</script>

<template>
    <div>
        <label class="input input-sm w-full">
            <i class="fa-solid fa-magnifying-glass opacity-50"></i>
            <input @input="debouncedLoad" type="search" required placeholder="Recherche" v-model="search" />
        </label>

        <ul class="list bg-base-100 rounded-box shadow-md mt-1 max-h-64 overflow-y-auto">
            <li class="flex h-32" v-if="clients.length == 0">
                <span class="opacity-50 m-auto">Aucun résultat</span>
            </li>

            <li class="list-row duration-300 cursor-pointer" v-for="client in clients" :key="client.id" @click="select(client)"
                :class="{ 'bg-base-300': client.isSelected }">
                <div class="my-auto">
                    <input type="checkbox" class="checkbox" :checked="client.isSelected" readonly />
                </div>
                <div class="my-auto"><i class="fa-regular fa-user"></i></div>
                <div class="list-col-grow">
                    <div>{{ client.fullName }}</div>
                    <div class="uppercase opacity-60">{{ client.address }}</div>
                </div>
                <div class="text-right opacity-60">
                    <div><i class="fa-solid fa-envelope text-xs"></i> {{ client.email }}</div>
                    <div><i class="fa-solid fa-phone text-xs"></i> {{ client.phone }}</div>
                </div>
            </li>
        </ul>

        <Pagination class="mt-1" :page="pagination.page" :total="total" :capacity="pagination.limit" />
    </div>
</template>