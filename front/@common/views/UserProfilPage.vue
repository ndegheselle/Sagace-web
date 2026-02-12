<script setup lang="ts">
import { useAuth } from '@common/composables/auth';
import { getLogo, type CompanyData } from '@common/data/companies';
import { ref, reactive, watch } from 'vue';

import { companies } from '@common/data/companies';

const { user } = useAuth();
const company = reactive<CompanyData>({} as CompanyData);
const fileInput = ref<HTMLInputElement | null>(null);

watch(
    () => user.value?.expand?.company,
    (c) => {
        if (c) {
            Object.assign(company, c);
        }
    },
    { immediate: true }
);

async function editCompany() {
    const files = fileInput.value?.files;
    const file = files?.[0];

    if (file) {
        // @ts-expect-error
        company.logo = file;
    }

    const response = await companies.update(company);
    company.logo = response.logo;
    if (user.value && response.logo)
        user.value.expand.company.logo = response.logo;
}
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <div class="card bg-base-200">
            <div class="card-body">
                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-16 rounded-full flex items-center justify-center bg-base-100 text-2xl">
                            <i class="fa-solid fa-user "></i>
                        </div>
                    </div>

                    <div class="flex-1">
                        <h2 class="card-title">
                            {{ user?.email }}
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-200 mt-2">
            <div class="card-body">
                <h2 class="card-title">Entreprise</h2>
                <fieldset class="fieldset">
                    <!-- Logo -->
                    <div class="flex mb-4">
                        <div class="avatar">
                            <div v-if="company.logo" class="w-24 rounded-xl">
                                <img :src="getLogo(company)" />
                            </div>
                            <div v-else class="w-24 rounded-xl flex items-center justify-center text-3xl border">
                                <i class="fa-solid fa-image"></i>
                            </div>
                        </div>

                        <input ref="fileInput" type="file" accept="image/png, image/gif, image/jpeg"
                            class="file-input w-full ms-2 my-auto" />
                    </div>

                    <!-- Name -->
                    <label class="label">Nom</label>
                    <input v-model="company.name" type="text" class="input input-bordered w-full" required />

                    <!-- Email -->
                    <label class="label">Email</label>
                    <input v-model="company.email" type="email" class="input input-bordered w-full" />

                    <!-- adress -->
                    <label class="label">Adresse</label>
                    <input v-model="company.adress" type="text" class="input input-bordered w-full" />

                    <!-- SIRET -->
                    <label class="label">SIRET</label>
                    <input v-model="company.SIRET" type="text" class="input input-bordered w-full" />

                    <!-- Phone -->
                    <label class="label">Téléphone</label>
                    <input v-model="company.phone" type="tel" class="input input-bordered w-full" />
                </fieldset>
                <div class="justify-end card-actions">
                    <button class="btn btn-primary" @click="editCompany">Modifier</button>
                </div>
            </div>
        </div>
    </div>
</template>