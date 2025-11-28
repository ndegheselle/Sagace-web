<script setup lang="ts">
// alternatively, you can also use it here
const { $alert, $confirmation } = useNuxtApp();
</script>

<template>
  <div>
    <button class="btn" @click="$alert.info('afaf')">Toasted</button>
    <button class="btn" @click="$confirmation.show('Title', 'Message', 'ph-alien')">Modal</button>
  </div>
</template>