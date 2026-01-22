<script setup lang="ts" generic="T extends BaseEntity">
import { reactive, onMounted } from 'vue';
import type { PaginationOptions } from '@sagace/common';
import Pagination from '@/components/Pagination.vue';
import { debounce } from '@/lib/base/debounce';
import type { BaseEntity } from '@sagace/common';

let search = "";
const pagination = reactive<PaginationOptions>({
    page: 1,
    limit: 5
});

const props = defineProps<{
    total: number,
    items: T[]
}>();

defineSlots<{
    actions(): any;
    header(): any;
    row(props: { item: T }): any;
}>();

const emit = defineEmits<{
  refresh: [search: string, pagination: PaginationOptions]
}>()

defineExpose({ refresh });

async function refresh() {
    emit('refresh', search, pagination);
}

const debouncedLoad = debounce(refresh, 300);
onMounted(refresh);
</script>

<template>
    <div class="flex flex-col">
        <div class="flex">
            <label class="input input-sm">
                <i class="fa-solid fa-magnifying-glass opacity-50"></i>
                <input @input="debouncedLoad" type="search" placeholder="Recherche" v-model="search" />
            </label>

            <div class="ms-auto">
            <slot name="actions" />
            </div>
        </div>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex-1 mt-1">
            <table class="table table-xs">
                <thead>
                    <tr>
                        <slot name="header" />
                    </tr>
                </thead>

                <tbody>
                    <template v-if="items.length">
                        <tr v-for="item in items" :key="item._id">
                            <slot name="row" :item="(item as T)" />
                        </tr>
                    </template>
                    <tr v-else>
                        <td colspan="100" class="text-center opacity-60 py-6">
                            Aucun résultat
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination class="mt-1" v-model:page="pagination.page" v-model:total="props.total" v-model:capacity="pagination.limit"
            @change="refresh" />
    </div>
</template>