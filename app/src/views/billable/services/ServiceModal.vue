<script setup lang="ts">
import { useAlert } from '@/composables/popups/alert';
import { useDeferredModal } from '@/composables/popups/modal';
import { Service, api } from '@/lib/api/billable/service';
import { reactive, ref, useTemplateRef } from 'vue';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
const alert = useAlert();

const form = reactive<Service>(new Service());
const error = ref('');
const isLoading = ref(false);

async function confirm() {
    isLoading.value = true;
    try {
        if (form.isNew) {
            await api.create(form);
        } else {
            await api.update(form.id, form);
        }

        modal.confirm();
        alert.success(form.isNew ? 'Service créé avec succès' : 'Service modifié avec succès');
    } catch (e: any) {
        error.value = e.data?.message || (form.isNew ? 'Création échouée' : 'Modification échouée');
    } finally {
        isLoading.value = false;
    }
}

function show(service: Service): Promise<boolean> {
    Object.assign(form, service);
    error.value = '';
    return modal.show();
}

defineExpose({ show });
</script>

<template>
    <dialog ref="dialog" class="modal">
        <div class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="modal.cancel">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <h3 class="text-lg font-bold">
                {{ form.isNew ? 'Nouveau service' : 'Modifier service' }}
            </h3>

            <fieldset class="fieldset">
                <!-- Name -->
                <label class="label">Nom</label>
                <input v-model="form.name" type="text" class="input input-bordered w-full"
                    placeholder="Développement web" required />

                <!-- Code -->
                <label class="label">Code</label>
                <input v-model="form.code" type="text" class="input input-bordered w-full"
                    placeholder="SRV-WEB-001" required />

                <!-- Description -->
                <label class="label">Description</label>
                <textarea v-model="form.description" class="textarea textarea-bordered w-full"
                    placeholder="Description du service" />

                <!-- Price & Duration -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="label">Prix (€)</label>
                        <input v-model.number="form.price" type="number" min="0" step="0.01"
                            class="input input-bordered w-full" placeholder="75.00" required />
                    </div>

                    <div>
                        <label class="label">Durée (heures)</label>
                        <input v-model.number="form.durationHours" type="number" min="0" step="0.5"
                            class="input input-bordered w-full" placeholder="10" />
                    </div>
                </div>

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
                    {{ form.isNew ? 'Créer' : 'Sauvegarder' }}
                </button>
            </div>
        </div>

        <div class="modal-backdrop">
            <button @click="modal.cancel">close</button>
        </div>
    </dialog>
</template>
