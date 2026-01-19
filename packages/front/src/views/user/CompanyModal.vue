<script setup lang="ts">
import { useDeferredModal } from '@/composables/popups/modal';
import { api } from '@/lib/api/users';
import { CompanyDTO } from '@sagace/common/DTOs/user';
import { reactive, ref, useTemplateRef } from 'vue';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);

const form = reactive<CompanyDTO>(new CompanyDTO());
const error = ref('');
const isLoading = ref(false);
const isUploadingLogo = ref(false);

const logoFile = ref<File | null>(null);
const apiUrl = import.meta.env.VITE_API_URL;

async function uploadLogo() {
    if (!logoFile.value) return;

    isUploadingLogo.value = true;
    try {
        form.logoUrl = await api.updateCompanyLogo(logoFile.value);
        console.log(form.logoUrl);
    } catch {
        error.value = 'Échec du téléversement du logo';
    } finally {
        isUploadingLogo.value = false;
        logoFile.value = null;
    }
}

async function confirm() {
    isLoading.value = true;
    try {
        await api.updateCompany(form);
        modal.confirm();
    } catch (e: any) {
        error.value = e.data?.message || 'Opération échouée';
    } finally {
        isLoading.value = false;
    }
}

function show(company: CompanyDTO): Promise<boolean> {
    Object.assign(form, company);
    error.value = '';
    return modal.show();
}

function onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        logoFile.value = file;
        uploadLogo();
    }
}

defineExpose({ company: form, show });
</script>
<template>
    <dialog ref="dialog"
            class="modal">
        <div class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    @click="modal.cancel">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <h3 class="text-lg font-bold">
                Modifier entreprise
            </h3>

            <fieldset class="fieldset">
                <!-- Logo -->
                <div class="flex mb-4">
                    <div class="avatar">
                        <div v-if="form.logoUrl"
                             class="w-24 rounded-full">
                            <img :src="apiUrl + form.logoUrl" />
                        </div>
                        <div v-else
                             class="w-24 rounded-full flex items-center justify-center text-3xl border">
                            <i class="fa-solid fa-image"></i>
                        </div>
                    </div>

                    <input type="file"
                           accept="image/png, image/gif, image/jpeg"
                           class="file-input w-full ms-2 my-auto"
                           :disabled="isUploadingLogo"
                           @change="onLogoSelected" />
                </div>

                <!-- Name -->
                <label class="label">Nom</label>
                <input v-model="form.name"
                       type="text"
                       class="input input-bordered w-full"
                       required />

                <!-- Email -->
                <label class="label">Email</label>
                <input v-model="form.email"
                       type="email"
                       class="input input-bordered w-full" />

                <!-- adress -->
                <label class="label">Adresse</label>
                <input v-model="form.adress"
                       type="text"
                       class="input input-bordered w-full" />

                <!-- SIRET -->
                <label class="label">SIRET</label>
                <input v-model="form.SIRET"
                       type="text"
                       class="input input-bordered w-full" />

                <!-- Phone -->
                <label class="label">Téléphone</label>
                <input v-model="form.phone"
                       type="tel"
                       class="input input-bordered w-full" />

                <!-- Error -->
                <small v-if="error"
                       class="text-error">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    {{ error }}
                </small>
            </fieldset>

            <!-- Actions -->
            <div class="modal-action">
                <button class="btn btn-neutral"
                        @click="modal.cancel">
                    Annuler
                </button>

                <button class="btn btn-primary"
                        :disabled="isLoading"
                        @click="confirm">
                    <span v-if="isLoading"
                          class="loading loading-spinner loading-sm"></span>
                    Sauvegarder
                </button>
            </div>
        </div>

        <div class="modal-backdrop">
            <button @click="modal.cancel"></button>
        </div>
    </dialog>
</template>