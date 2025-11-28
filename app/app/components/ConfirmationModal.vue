<script setup lang="ts">
import { onMounted, ref } from 'vue';

const { $confirmation: confirmation } = useNuxtApp();

const dialogEl = ref<HTMLDialogElement>();

onMounted(() => {
  if (dialogEl.value) {
    confirmation.registerDialog(dialogEl.value);
  }
});
</script>
<template>
  <dialog
    id="confirm_modal"
    class="modal"
    ref="dialogEl"
  >
    <div class="modal-box">

      <div class="flex items-center mb-4">
        <i v-if="confirmation.icon" class="mr-3"></i>
        <h3 class="text-lg font-bold">{{ confirmation.title }}</h3>
      </div>

      <p class="py-2">{{ confirmation.message }}</p>

      <div class="modal-action">
        <button class="btn" @click="confirmation.cancel()">Cancel</button>
        <button class="btn btn-primary" @click="confirmation.confirm()">Confirm</button>
      </div>
    </div>
  </dialog>
</template>