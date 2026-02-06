<script setup lang="ts">
import { useAlert } from '@common/composables/popups/alert';
import { useDeferredModal } from '@common/composables/popups/modal';
import { reactive, ref, useTemplateRef } from 'vue';
import { clients } from '@features/invoicing/data/clients';
import type { ClientsResponse } from '@common/database/types.g';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
const alert = useAlert();

const form = reactive<ClientsResponse>({} as ClientsResponse);
const error = ref('');
const isLoading = ref(false);

async function confirm() {
    isLoading.value = true;
    try {
        if (form.id == null) {
            await clients.create(form);
            alert.success('Client créé avec succès');
        } else {
            await clients.update(form.id, form);
            alert.success('Client modifié avec succès');
        }
        modal.confirm();
    } catch (e: any) {
        error.value = e.data?.message || (form.id == null ? 'Création échouée' : 'Modification échouée');
    } finally {
        isLoading.value = false;
    }
}

function show(client: ClientsResponse): Promise<boolean> {
    Object.assign(form, client);
    error.value = '';
    return modal.show();
}

defineExpose({ client: form, show });
</script>

<template>
    <dialog ref="dialog" class="modal">
        <div class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="modal.cancel">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <h3 class="text-lg font-bold">
                {{ form.id == null ? 'Nouveau client' : 'Modifier client' }}
            </h3>

            <fieldset class="fieldset">
                <!-- First & Last Name -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="label">Prénom</label>
                        <input v-model="form.firstName" type="text" class="input input-bordered w-full"
                            placeholder="John" required />
                    </div>

                    <div>
                        <label class="label">Nom</label>
                        <input v-model="form.lastName" type="text" class="input input-bordered w-full"
                            placeholder="Doe" required />
                    </div>
                </div>

                <!-- Email -->
                <label class="label">Email</label>
                <input v-model="form.email" type="email" class="input input-bordered w-full"
                    placeholder="john.doe@email.com" required />

                <!-- Phone -->
                <label class="label">Téléphone</label>
                <input v-model="form.phone" type="tel" class="input input-bordered w-full"
                    placeholder="+33 03 01 02 03" />

                <!-- adress -->
                <label class="label">Adresse</label>
                <input v-model="form.adress" type="text" class="input input-bordered w-full"
                    placeholder="Adresse" />

                <!-- Error -->
                <small class="text-error" v-if="error">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    {{ error }}
                </small>
            </fieldset>

            <!-- Actions -->
            <div class="modal-action">
                <button class="btn btn-neutral" @click="modal.cancel">
                    <i class="fa-solid fa-circle-xmark"></i>
                    Annuler
                </button>
                <button class="btn btn-primary" :disabled="isLoading" @click="confirm">
                    <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                    <i class="fa-solid fa-plus"></i>
                    {{ form.id == null ? 'Créer' : 'Sauvegarder' }}
                </button>
            </div>
        </div>

        <div class="modal-backdrop">
            <button @click="modal.cancel">close</button>
        </div>
    </dialog>
</template>