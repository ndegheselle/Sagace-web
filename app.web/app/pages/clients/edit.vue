<script setup lang="ts">
import type { ClientDTO } from '~~/shared/DTOs/ClientDTO';
const props = defineProps<ClientDTO>();

const error = ref('');
const isLoading = ref(false);
</script>
<template>
    <div class="container mx-auto flex flex-col my-1">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-4 mx-auto mt-2">
            <legend class="fieldset-legend text-2xl">{{ props.firstName }} {{ props.lastName }}</legend>

            <!-- First & Last Name -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="label">Prénom</label>
                    <input v-model="props.firstName" type="text" class="input input-bordered w-full" placeholder="John"
                        required />
                </div>

                <div>
                    <label class="label">Nom</label>
                    <input v-model="props.lastName" type="text" class="input input-bordered w-full" placeholder="Doe"
                        required />
                </div>
            </div>

            <label class="label">Email</label>
            <input v-model="props.email" type="email" class="input input-bordered w-full"
                placeholder="john.doe@email.com" required />

            <label class="label">Entreprise</label>
            <input v-model="props.company" type="text" class="input input-bordered w-full" placeholder="Entreprise" />

            <label class="label">Téléphone</label>
            <input v-model="props.phone" type="tel" class="input input-bordered w-full" placeholder="+33 03 01 02 03" />

            <label class="label">Adresse</label>
            <input v-model="props.address" type="text" class="input input-bordered w-full" placeholder="Adresse" />

            <small class="text-error" v-if="error">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {{ error }}
            </small>

            <div class="grid grid-cols-2 gap-2 mt-4">
                <NuxtLink to="/clients" class="btn btn-neutral">
                    <i class="fa-solid fa-circle-xmark"></i>
                    Annuler
                </NuxtLink>
                <button class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                    <i class="fa-solid fa-plus"></i>
                    Créer
                </button>
            </div>
        </fieldset>
    </div>
</template>