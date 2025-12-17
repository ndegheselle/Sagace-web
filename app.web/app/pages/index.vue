<script setup lang="ts">

  const confirmation = useConfirmation();
  const alert = useAlert();

</script>

<template>
  <div class="container mx-auto mt-1">
    <button class="btn" @click="alert.info('afaf')">Toatsed</button>
    <button class="btn" @click="confirmation.show('Title', 'Message', 'fa-solid fa-person-military-to-person')">Modal</button>
  </div>
</template>