<script setup lang="ts">
import EditModal from '@common/components/data/EditModal.vue';
import FormInput from '@common/components/data/FormInput.vue';
import FormSelect from '@common/components/data/FormSelect.vue';
import FormTextarea from '@common/components/data/FormTextarea.vue';
import { services, type ServiceData } from '@features/stock/data/services';
import { computed, useTemplateRef } from 'vue';

const dialog = useTemplateRef('dialog');

const data = computed(() => dialog.value?.data);

function show(service: ServiceData) {
    return dialog.value!.show(service);
}

defineExpose({ service: data, show });
</script>

<template>
    <EditModal :crud="services"
               ref="dialog">
        <template #form="{ data, errors }">
            <fieldset class="fieldset">
                <!-- Name -->
                <FormInput v-model="data.name"
                           :error="errors?.name"
                           label="Nom *" />

                <!-- Code -->
                <FormInput v-model="data.code"
                           :error="errors?.code"
                           label="Code" />

                <!-- Description -->
                <FormTextarea v-model="data.description"
                              :error="errors?.description"
                              label="Description" />

                <!-- Price / VAT / Duration -->
                <div class="grid grid-cols-3 gap-4">
                    <FormInput v-model="data.unitPrice"
                               :error="errors?.unitPrice"
                               type="number"
                               min="0"
                               step="0.01"
                               label="Prix (€) *" />

                    <FormSelect v-model="data.vatRate"
                                :error="errors?.vatRate"
                                label="TVA *">
                            <option :value="0.2">Taux normal (20%)</option>
                            <option disabled>Électroménager, vêtements, services de conseil, logiciels, voitures neuves,
                                meubles, etc.</option>
                            <option :value="0.1">Produits et services spécifiques (10%)</option>
                            <option disabled>Restauration (hors boissons alcoolisées), travaux de rénovation,
                                hébergement touristique, transports de voyageurs, certains produits agricoles.</option>
                            <option :value="0.055">
                                Produits de première nécessité (5,5%)
                            </option>
                            <option disabled>Alimentation (hors boissons alcoolisées et plats préparés), livres, gaz,
                                électricité, équipements pour personnes handicapées, abonnements aux cantines scolaires.
                            </option>
                            <option :value="0.021">Produits très spécifiques (2,1%)</option>
                            <option disabled>Médicaments remboursables par la Sécurité sociale, presse (journaux,
                                magazines), certaines représentations théâtrales ou musicales.</option>
                            <option :value="0">Exportations hors UE, opérations exonérées (0%)</option>
                            <option disabled>Exportations de biens vers des pays hors UE, certaines opérations bancaires
                                ou financières.</option>
                            <option :value="0">Cas particuliers (Exonération)</option>
                            <option disabled>Services médicaux, locations nues (hors meublés), formations
                                professionnelles continues, certaines activités agricoles.</option>
                    </FormSelect>

                    <FormInput v-model="data.durationHours"
                               :error="errors?.durationHours"
                               type="number"
                               min="0"
                               step="0.5"
                               label="Durée (heures)" />
                </div>
            </fieldset>
        </template>
    </EditModal>
</template>
