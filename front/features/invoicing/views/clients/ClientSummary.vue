<script setup lang="ts">
import type { ClientsResponse } from '@common/database/types.g';

const props = defineProps<{
    client?: ClientsResponse
}>();
</script>

<template>
    <div class="card card-side bg-neutral">

        <i class="my-auto fa-solid fa-user text-8xl opacity-20"></i>
        <div class="card-body">
            <h2 class="card-title">{{ client?.firstName }} {{ client?.lastName }}</h2>
            <p><i class="fa-solid fa-house"></i> {{ client?.adress }}</p>

            <div class="card-actions">
                <span class="badge"><a :href="`tel:${client?.phone}`"><i class="fa-solid fa-phone"></i> {{ client?.phone
                        }}</a></span>

                <span class="badge"><a class="block" :href="`mailto:${client?.email}`"><i
                            class="fa-solid fa-envelope"></i> {{ client?.email
                        }}</a></span>
            </div>

        </div>
    </div>
</template>
