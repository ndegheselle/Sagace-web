<script setup lang="ts">
import EditModal from '@common/components/data/EditModal.vue';
import FormInput from '@common/components/data/FormInput.vue';
import { clients, type ClientData } from '@features/invoicing/data/clients';
import { computed, useTemplateRef } from 'vue';

const dialog = useTemplateRef('dialog');

const data = computed(() => dialog.value?.data);
function show(client: ClientData) {
  return dialog.value!.show(client)
}

defineExpose({ client: data, show });
</script>

<template>
    <EditModal :crud="clients" ref="dialog">
        <template #form="{ data, errors }">
            <fieldset class="fieldset">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <FormInput v-model="data.firstName" :error="errors?.firstName" label="Prénom *" />
                    </div>
                    <div>
                        <FormInput v-model="data.lastName" :error="errors?.lastName" label="Nom *" />
                    </div>
                </div>
                <FormInput v-model="data.email" type="email" :error="errors?.email" label="Email" />
                <FormInput v-model="data.phone" type="tel" :error="errors?.phone" label="Téléphone"
                    placeholder="+33 03 01 02 03" />
                <FormInput v-model="data.adress" label="Adresse *" :error="errors?.adress" />
            </fieldset>
        </template>
    </EditModal>
</template>