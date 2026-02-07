<script setup lang="ts">
import { useAlert } from '@common/composables/popups/alert';
import { useDeferredModal } from '@common/composables/popups/modal';
import { reactive, ref, useTemplateRef } from 'vue';
import { clients } from '@features/invoicing/data/clients';
import type { ClientsResponse } from '@common/database/types.g';
import FormInput from '@common/components/data/FormInput.vue';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
const alert = useAlert();

const form = reactive<ClientsResponse>({} as ClientsResponse);
const errors = ref({} as { [key in keyof ClientsResponse]?: { message: string } });
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
        errors.value = e.data?.data || (form.id == null ? 'Création échouée' : 'Modification échouée');
    } finally {
        isLoading.value = false;
    }
}

function show(client: ClientsResponse): Promise<boolean> {
    Object.assign(form, client);
    errors.value = {};
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
                        <FormInput v-model="form.firstName" :error="errors?.firstName" label="Prénom" />
                    </div>
                    <div>
                        <FormInput v-model="form.lastName" :error="errors?.lastName" label="Nom" />
                    </div>
                </div>
                <!-- Email -->
                <FormInput v-model="form.email" type="email" :error="errors?.email" label="Email" />
                <!-- Phone -->
                <FormInput v-model="form.phone" type="tel" :error="errors?.phone" label="Téléphone"
                    placeholder="+33 03 01 02 03" />
                <!-- adress -->
                <FormInput v-model="form.adress" label="Adresse" :error="errors?.adress" />
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