<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useDeferredModal } from '@/composables/popups/modal';
import { Service, api } from '@/lib/api/billable/service';
import { debounce } from '@/lib/base/debounce';
import type { PaginationOptions } from '@/lib/base/paginated';
import { reactive, ref, useTemplateRef } from 'vue';

let search = '';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
const selected = ref<Service | null>(null);

const services = ref<(Service & { isSelected?: boolean })[]>([]);
const total = ref(0);

const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 5
});

const debouncedLoad = debounce(load, 300);

async function load() {
    const result = await api.search(search, pagination);
    services.value = result.data || [];
    total.value = result.total || 0;
}

function confirm() {
    if (!selected.value)
        return;

    selected.value.isSelected = false;
    modal.confirm();
}

function select(service: Service) {
    if (service.isSelected) {
        service.isSelected = false;
        selected.value = null;
        return;
    }

    // Unselect all services
    for (const s of services.value) {
        s.isSelected = false;
    }

    // Select the clicked one
    service.isSelected = true;
    selected.value = service;
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
                    @click="modal.cancel">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <h3 class="text-lg font-bold">Sélectionner un service</h3>

            <label class="input input-sm w-full mt-4">
                <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                <input type="search"
                       required
                       placeholder="Recherche"
                       v-model="search"
                       @input="debouncedLoad" />
            </label>

            <ul class="list bg-base-100 rounded-box border border-base-content/5 mt-1 max-h-128 overflow-y-auto">
                <li class="flex h-32"
                    v-if="services.length === 0">
                    <span class="opacity-50 m-auto">Aucun résultat</span>
                </li>

                <li v-for="service in services"
                    :key="service.id"
                    class="list-row cursor-pointer duration-300"
                    :class="{ 'bg-base-300': service.isSelected }"
                    @click="select(service)">
                    <div class="my-auto">
                        <input type="checkbox"
                               class="checkbox"
                               :checked="service.isSelected"
                               readonly />
                    </div>

                    <div class="list-col-grow">
                        <div>{{ service.name }}</div>
                        <div class="uppercase opacity-60">{{ service.code }}</div>
                        <div v-if="service.description"
                             class="text-sm opacity-50 truncate">
                            {{ service.description }}
                        </div>
                    </div>

                    <div class="text-right opacity-60">
                        <div>{{ service.unitPrice.toFixed(2) }} €</div>
                        <div v-if="service.durationHours"
                             class="badge badge-outline">
                            {{ service.durationHours }} h
                        </div>
                    </div>
                </li>
            </ul>

            <Pagination :page="pagination.page"
                        :total="total"
                        :capacity="pagination.limit" />

            <div class="modal-action">
                <button class="btn btn-neutral"
                        @click="modal.cancel">
                    <i class="fa-solid fa-circle-xmark"></i>
                    Annuler
                </button>

                <button class="btn btn-primary"
                        :disabled="!selected"
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