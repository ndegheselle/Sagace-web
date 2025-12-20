<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Client, api } from '@/lib/api/client';
import { useAlert } from '@/composables/popups/alert';
import { useRouter } from 'vue-router';

const router = useRouter();
const alert = useAlert();
const form = reactive<Client>({} as Client);

const error = ref('');
const isLoading = ref(false);

async function create() {
    isLoading.value = true;
    try {
        await api.create(form);
        router.push('/clients');
        alert.success('Client créé avec succès');
    } catch (e: any) {
        error.value = e.data?.message || 'Login failed';
    } finally {
        isLoading.value = false;
    }
}

</script>
<template>
    <div class="container mx-auto flex flex-col my-1">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-4 mx-auto mt-2">
            <legend class="fieldset-legend text-2xl">Nouveau client</legend>

            <!-- First & Last Name -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="label">Prénom</label>
                    <input v-model="form.firstName" type="text" class="input input-bordered w-full" placeholder="John"
                        required />
                </div>

                <div>
                    <label class="label">Nom</label>
                    <input v-model="form.lastName" type="text" class="input input-bordered w-full" placeholder="Doe"
                        required />
                </div>
            </div>

            <label class="label">Email</label>
            <input v-model="form.email" type="email" class="input input-bordered w-full"
                placeholder="john.doe@email.com" required />

            <label class="label">Entreprise</label>
            <input v-model="form.company" type="text" class="input input-bordered w-full" placeholder="Entreprise" />

            <label class="label">Téléphone</label>
            <input v-model="form.phone" type="tel" class="input input-bordered w-full" placeholder="+33 03 01 02 03" />

            <label class="label">Adresse</label>
            <input v-model="form.address" type="text" class="input input-bordered w-full" placeholder="Adresse" />

            <small class="text-error" v-if="error">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {{ error }}
            </small>

            <div class="grid grid-cols-2 gap-2 mt-4">
                <RouterLink to="/clients" class="btn btn-neutral">
                    <i class="fa-solid fa-circle-xmark"></i>
                    Annuler
                </RouterLink>
                <button class="btn btn-primary" :disabled="isLoading" @click="create">
                    <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                    <i class="fa-solid fa-plus"></i>
                    Créer
                </button>
            </div>
        </fieldset>
    </div>
</template>