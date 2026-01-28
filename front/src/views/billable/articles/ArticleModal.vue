<script setup lang="ts">
import { useAlert } from '@/composables/popups/alert';
import { useDeferredModal } from '@/composables/popups/modal';
import { StockArticle, api } from '@/data/billables/articles';
import { reactive, ref, useTemplateRef } from 'vue';

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const modal = useDeferredModal(dialog);
const alert = useAlert();

const form = reactive<StockArticle>(new StockArticle());
const error = ref('');
const isLoading = ref(false);

async function confirm() {
    isLoading.value = true;
    try {
        if (form.isNew)
            await api.create(form);
        else
            await api.update(form._id, form);

        modal.confirm();
        alert.success(form.isNew ? 'Article créé avec succès' : 'Article modifié avec succès');
    } catch (e: any) {
        error.value = e.data?.message || 'Sauvegarde échouée';
    } finally {
        isLoading.value = false;
    }
}

function show(article: StockArticle): Promise<boolean> {
    Object.assign(form, article);
    error.value = '';
    return modal.show();
}

defineExpose({
    show
});
</script>

<template>
    <dialog ref="dialog" class="modal">
        <div class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="modal.cancel"><i
                    class="fa-solid fa-xmark"></i></button>
            <h3 class="text-lg font-bold">{{ form.isNew ? 'Nouvel article' : 'Modifier article' }}</h3>
            <fieldset class="fieldset ">
                <!-- Name -->
                <label class="label">Nom</label>
                <input v-model="form.name" type="text" class="input input-bordered w-full"
                    placeholder="Clavier mécanique" required />

                <!-- SKU -->
                <label class="label">SKU</label>
                <input v-model="form.sku" type="text" class="input input-bordered w-full" placeholder="KEY-MECH-001"
                    required />

                <!-- Description -->
                <label class="label">Description</label>
                <textarea v-model="form.description" class="textarea textarea-bordered w-full"
                    placeholder="Description de l'article" />

                <!-- Price & Quantity -->
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="label">Prix (€)</label>
                        <input v-model.number="form.unitPrice" type="number" min="0" step="0.01"
                            class="input input-bordered w-full" placeholder="99.99" required />
                    </div>
                    <div>
                        <label class="label">TVA (%)</label>
                        <select class="select" v-model="form.vatRateType">
                            <option value="0.2">Taux normal (20%)</option>
                            <option disabled>Électroménager, vêtements, services de conseil, logiciels, voitures neuves,
                                meubles, etc.</option>
                            <option value="0.1">Produits et services spécifiques (10%)</option>
                            <option disabled>Restauration (hors boissons alcoolisées), travaux de rénovation,
                                hébergement touristique, transports de voyageurs, certains produits agricoles.</option>
                            <option value="0.055">
                                Produits de première nécessité (5,5%)
                            </option>
                            <option disabled>Alimentation (hors boissons alcoolisées et plats préparés), livres, gaz,
                                électricité, équipements pour personnes handicapées, abonnements aux cantines scolaires.
                            </option value="0.021">
                            <option>Produits très spécifiques (2,1%)</option>
                            <option disabled>Médicaments remboursables par la Sécurité sociale, presse (journaux,
                                magazines), certaines représentations théâtrales ou musicales.</option>
                            <option value="0">Exportations hors UE, opérations exonérées (0%)</option>
                            <option disabled>Exportations de biens vers des pays hors UE, certaines opérations bancaires
                                ou financières.</option>
                            <option value="0">Cas particuliers (Exonération)</option>
                            <option disabled>Services médicaux, locations nues (hors meublés), formations
                                professionnelles continues, certaines activités agricoles.</option>
                        </select>
                    </div>
                    <div>
                        <label class="label">Quantité</label>
                        <input v-model.number="form.quantity" type="number" min="0" class="input input-bordered w-full"
                            placeholder="10" required />
                    </div>
                </div>

                <!-- Error -->
                <small class="text-error" v-if="error">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    {{ error }}
                </small>


            </fieldset>
            <div class="modal-action">
                <button @click="modal.cancel" class="btn btn-neutral">
                    <i class="fa-solid fa-circle-xmark"></i>
                    Annuler
                </button>

                <button class="btn btn-primary" :disabled="isLoading" @click="confirm">
                    <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                    <i class="fa-solid fa-plus"></i>
                    Sauvegarder
                </button>
            </div>

        </div>
        <div class="modal-backdrop">
            <button @click="modal.cancel">close</button>
        </div>
    </dialog>
</template>