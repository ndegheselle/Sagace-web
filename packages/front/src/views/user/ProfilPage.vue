<script setup lang="ts">
import { useAuth } from '@/composables/auth';
import CompanyModal from '@/views/user/CompanyModal.vue';
import { useTemplateRef } from 'vue';
const { user } = useAuth();
const modalRef = useTemplateRef('modal');
const apiUrl = import.meta.env.VITE_API_URL;

async function edit() {
    if (!user.value)
        return;

    if (await modalRef.value?.show(user.value.company) == true && modalRef.value?.company)
        user.value.company = modalRef.value.company;
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <div class="card bg-base-200">
            <div class="card-body">
                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-16 rounded-full flex items-center justify-center border text-2xl">
                            <i class="fa-solid fa-user "></i>
                        </div>
                    </div>

                    <div class="flex-1">
                        <h2 class="card-title">
                            {{ user?.name }}
                        </h2>
                        <p v-if="user?.email"
                           class="text-sm text-gray-500">
                            {{ user?.email }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-200 mt-2">
            <div class="card-body">
                <!-- Header -->
                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div v-if="user?.company.logoUrl"
                             class="w-16 rounded-xl">
                            <img :src="apiUrl + user?.company.logoUrl" />
                        </div>
                        <div v-else
                             class="w-16 rounded-full flex items-center justify-center border text-2xl">
                            <i class="fa-solid fa-image"></i>
                        </div>
                    </div>

                    <div class="flex-1">
                        <h2 class="card-title">
                            {{ user?.company.name || 'Entreprise' }}
                        </h2>
                        <p v-if="user?.company.email"
                           class="text-sm text-gray-500">
                            {{ user?.company.email }}
                        </p>
                    </div>

                    <button class="btn btn-sm btn-ghost"
                            @click="edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </div>

                <!-- Divider -->
                <div class="divider my-2"></div>

                <!-- Infos -->
                <div class="space-y-2 text-sm">
                    <div v-if="user?.company.adress"
                         class="flex gap-2 items-center">
                        <i class="fa-solid fa-location-dot w-4 text-center"></i>
                        <span>{{ user?.company.adress }}</span>
                    </div>

                    <div v-if="user?.company.phone"
                         class="flex gap-2 items-center">
                        <i class="fa-solid fa-phone w-4 text-center"></i>
                        <span>{{ user?.company.phone }}</span>
                    </div>

                    <div v-if="user?.company.SIRET"
                         class="flex gap-2 items-center">
                        <i class="fa-solid fa-building w-4 text-center"></i>
                        <span>SIRET : {{ user?.company.SIRET }}</span>
                    </div>
                </div>
            </div>
        </div>
        <CompanyModal ref="modal" />
    </div>
</template>